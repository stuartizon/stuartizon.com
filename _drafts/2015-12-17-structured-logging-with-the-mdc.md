---
title:  "Structured logging with the MDC"
date:   2015-12-17
---
Modern logging systems (Graylog, Loggly etc.) are great at reading in JSON formatted logs so you can send in custom data in fields of your choosing. But how can you log structured data with Akka?

As a motivating example let's say I want to log data for an HTTP request:
{% highlight json %}
{
  "type": "request",
  "uri": "example-endpoint/",
  "method": "GET"
}
{% endhighlight %}
and log the response data for the same endpoint:
{% highlight json %}
{
  "type": "response",
  "uri": "example-endpoint/",
  "status": 400,
  "method": "GET"
}
{% endhighlight %}

# SLF4J Logging
If you are using the Akka SLF4J logger, one approach suggested by the [Akka documentation](http://doc.akka.io/docs/akka/current/java/logging.html#MDC_values_defined_by_the_application) is to set custom fields on the MDC.

The Akka documentation provides the following example:
{% highlight scala %}
class MdcActor extends UntypedActor {
    final DiagnosticLoggingAdapter log = Logging.getLogger(this);

    public void onReceive(Object message) {
        Map<String, Object> mdc;
        mdc = new HashMap<String, Object>();
        mdc.put("requestId", 1234);
        mdc.put("visitorId", 5678);
        log.setMDC(mdc);

        log.info("Starting new request");

        log.clearMDC();
    }
}
{% endhighlight %}

However this requires much more work if we want to allow for generic logging of the fields above: `type`, `uri`, `status`, `method`. Moreover it involves us setting up a specific logging actor ourselves, which is not something we would need to do if we were using the standard dispatcher e.g. with `ActorLogging`. Indeed the documentation for the [`DiagnosticLoggingAdapter`](http://doc.akka.io/api/akka/2.4/akka/event/DiagnosticLoggingAdapter.html) trait is more explicit: **Only recommended to be used within Actors as it isn't thread safe.**

To understand why that is, we'll need to look deeper into the MDC.

# Mapped Diagnostic Context
The Mapped Diagnostic Context (or MDC) is a place for the developer to add contextual information to logging statements. It was designed as part of the SLF4J API, and implemented in logback-classic.

The MDC is intrinsically tied to the `ThreadLocal`. Indeed the very idea of that was to discourage the approach of "instantiating a new and separate logger for each client. This technique promotes the proliferation of loggers and may increase their management overhead".[^1] This all made sense back when we were using the "traditional" web server model with one thread per request, but doesn't work well when a single HTTP request may create several futures, each of which will be running on a separate thread.

(Aside: I particularly like the explanation of threading models in the Kamon documentation <http://kamon.io/documentation/kamon-core/0.6.6/tracing/threading-model-considerations/>)
![Event based model](http://kamon.io/assets/img/diagrams/reactive-model.png)

 If we are to continue using the MDC for logging structured data with the "event based model", we will need a way of attaching the MDC to the message at the very moment of logging.

# MdcLoggingAdapter
My approach is to create a new implementation of Akka's `LoggingAdapter` which expects the MDC fields to be provided as a Map in the parameter(s) after the message for all the various logging functions.

For example, to log a user's first name and last name, you could do the following:

{% highlight scala %}
val user = Map("firstname"->"John", "lastname"->"Smith")
log.info("Something happened", user)
{% endhighlight %}

If you use the logging functions with only the message parameter (e.g. `info(message: String)`) then they will log as you would expect with no MDC fields.

**Beware that in order to do this I have abused the interface definition** i.e. this adapter replaces the String interpolation templating functionality defined in the interface.

# Graylog and synchronous logging
At OVO we are using Graylog and one of the nice things about it is you can send in log data using the GELF[^2] format over UDP, so for this use case it is fine to call this log function synchronously. To do so we define:

{% highlight scala %}
trait MdcLogging extends LoggingAdapterProvider {
  override def log: LoggingAdapter = new MdcLoggingAdapter(akka.event.slf4j.Logger.root)
}
{% endhighlight %}

and use the logback appender <https://github.com/Moocar/logback-gelf> to add the MDC fields to the GELF request body.

Going back to our example, we would define

{% highlight scala %}
requestInstance {request =>
  val fields = Map("uri" -> request.uri.toString, "type" -> "request", "method" -> request.method.toString)
  log.info(s"${request.method.toString} ${request.uri.path}", fields)

  mapHttpResponse { response =>
      val fields = Map("uri" -> request.uri.toString, "status" -> response.status.intValue, "type" -> "response", "method" -> request.method.toString)
      log.info(s"${request.method.toString} ${request.uri.path}", fields)
      response
    } {
      ... // Routes go here
    }
}
{% endhighlight %}

In order to log over TCP or to do file based logging we can create an Actor (as we suggested in the beginning!)


[^1]: <https://logback.qos.ch/manual/mdc.html>.
[^2]: <http://docs.graylog.org/en/2.2/pages/gelf.html>.
