---
title: "Design Patterns: Mediator"
tags: [c#, design-patterns, mediator-pattern]
---

The mediator pattern allows objects to communicate to each other through a common instance of a mediator class. It promotes loose coupling and prevent objects to refer to each other directly.
<!--more-->

Through a common instance of a mediator the classes subscribing to it can communicate by sending messages to this instance and it will notify the other subscribed instances.

<a href="https://brunolm.files.wordpress.com/2015/07/2015-39-09-12-39-15-719.png"><img src="https://brunolm.files.wordpress.com/2015/07/2015-39-09-12-39-15-719.png" alt="2015-39-09 12-39-15-719" width="526" height="345" class="alignnone size-full wp-image-455" /></a>

```csharp
public abstract class Mediator
{
    public IList<AirCraft> AirCrafts { get; private set; }

    public Mediator()
    {
        AirCrafts = new List<AirCraft>();
    }

    public abstract void Send(AirCraft sender, string message);
}

public class CommunicationTower : Mediator
{
    public override void Send(AirCraft sender, string message)
    {
        foreach (var airCraft in AirCrafts)
        {
            if (airCraft != sender)
            {
                airCraft.Receive(sender, message);
            }
        }
    }
}

public abstract class AirCraftCollegue
{
    public abstract void Receive(AirCraft sender, string message);
}

public class AirCraft : AirCraftCollegue
{
    public AirCraft(CommunicationTower mediator)
    {
        mediator.AirCrafts.Add(this);
    }

    public string Name { get; set; }

    public override void Receive(AirCraft sender, string message)
    {
        Console.WriteLine("{0}: Received message '{1}' from '{2}'"
            , Name, message, sender.Name);
    }
}
```

In the above example the mediator tells the subscribed aircrafts (except the sender) that one of them is saying something.

Example usage:

```csharp
class Program
{
    static void Main(string[] args)
    {
        var towerMediator = new CommunicationTower();

        var airCraft1 = new AirCraft(towerMediator) { Name = "Unit #1" };
        var airCraft2 = new AirCraft(towerMediator) { Name = "Unit #2" };
        var airCraft3 = new AirCraft(towerMediator) { Name = "Unit #3" };
        var airCraft4 = new AirCraft(towerMediator) { Name = "Unit #4" };
        var airCraft5 = new AirCraft(towerMediator) { Name = "Unit #5" };

        towerMediator.Send(airCraft1, "Let's go up!");
    }
}
```

Output:

```
Unit #2: Received message 'Let's go up!' from 'Unit #1'
Unit #3: Received message 'Let's go up!' from 'Unit #1'
Unit #4: Received message 'Let's go up!' from 'Unit #1'
Unit #5: Received message 'Let's go up!' from 'Unit #1'
```


One real world example is the <a href="https://brunolm.wordpress.com/2015/03/01/messaging-eventaggregator/" target="_blank">EventAggreagator that we see on WPF</a>. It allows the communication between view models that don't know about the existence of each other.
