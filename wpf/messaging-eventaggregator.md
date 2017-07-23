---
title: "Messaging - EventAggregator"
tags: [c#, messaging, mvvm, wpf]
---

<div>In WPF MVVM we might want to send a message from one View Model to another. For example if we want to close a window and return data to the opener window. To allow such data exchange we can use a messaging system.</div>
<div></div>
<div>For that we have the EventAggregator pattern.</div>
<div></div>
<div>The EventAggregator class is going to store all instances that are being tracked. So when a message is published all those listed instances are going to be notified.</div>
<!--more-->

[code language="csharp"]
public interface IListen { }
public interface IListen<T> : IListen
{
    void Handle(T obj);
}

public class EventAggregator
{
    private List<IListen> subscribers = new List<IListen>();

    public void Subscribe(IListen model)
    {
        this.subscribers.Add(model);
    }

    public void Unsubscribe(IListen model)
    {
        this.subscribers.Remove(model);
    }

    public void Publish<T>(T message)
    {
        foreach (var item in this.subscribers.OfType<IListen<T>>())
        {
            item.Handle(message);
        }
    }
}
[/code]

<div></div>
<div>To demonstrate this example lets use a class Car which is going to be listening for signals. A class Guard which will notify the cars througth a SignalMessage class.</div>
<div></div>

[code language="csharp"]
public class Car : IListen<SignalMessage>
{
    public Car(EventAggregator eventAggregator)
    {
        eventAggregator.Subscribe(this);
    }

    public void Handle(SignalMessage obj)
    {
        Console.WriteLine("I'm a car and a guard is telling me to stop!");
    }
}

public class Guard
{
    private EventAggregator eventAggregator;

    public Guard(EventAggregator eventAggregator)
    {
        this.eventAggregator = eventAggregator;
    }

    public void SignalCars()
    {
        this.eventAggregator.Publish(new SignalMessage { Message = "Stop" });
    }
}

public class SignalMessage
{
    public string Message { get; set; }
}
[/code]

<div></div>
<div>If we then run this application</div>
<div></div>

[code language="csharp"]
static void Main(string[] args)
{
    var eventAggregator = new EventAggregator();

    var car1 = new Car(eventAggregator);
    var car2 = new Car(eventAggregator);
    var car3 = new Car(eventAggregator);

    var guard = new Guard(eventAggregator);

    guard.SignalCars();

    Console.ReadKey(true);
}
[/code]

<div></div>
<div>We will notice that all the cards are being notified</div>
<div><a href="https://brunolm.files.wordpress.com/2015/03/01.jpg"><img class="alignnone wp-image-37 size-full" src="https://brunolm.files.wordpress.com/2015/03/01.jpg" alt="01" width="364" height="54" /></a></div>
