---
title: "Design Patterns: Proxy"
tags: [c#, design-patterns, proxy-pattern]
---

The proxy design pattern is a layer that prevents you from instantiating heavy objects that are not going to be needed at a certain time.
<!--more-->

The proxy pattern could be used to:
<ul>
	<li>prevent loading unnecessary resources</li>
	<li>access real data in a remote location</li>
	<li>prevent control from accessing non-declared members/methods</li>
</ul>

One example of the proxy structure could be the following:

<a href="https://brunolm.files.wordpress.com/2015/07/2015-46-08-11-46-24-093.png"><img src="https://brunolm.files.wordpress.com/2015/07/2015-46-08-11-46-24-093.png" alt="2015-46-08 11-46-24-093" width="352" height="283" class="alignnone size-full wp-image-446" /></a>

I can have a proxy to access a store, if the store is closed it shouldn't even bother in loading unnecessary resources.

[code language="csharp"]
public interface IStore
{
    void ListItems();
}

public class ProxyStore : IStore
{
    private RealStore realStore;

    public void ListItems()
    {
        if (DateTime.Now.Hour >= 6 && DateTime.Now.Hour <= 10)
        {
            if (realStore == null)
            {
                realStore = new RealStore();
            }

            realStore.ListItems();
        }
        else
        {
            Console.WriteLine("We're closed!");
        }
    }
}
public class RealStore : IStore
{
    public void ListItems()
    {
        Console.WriteLine("Heavy graphics Weapon 1");
        Console.WriteLine("Heavy graphics Weapon 2");
        Console.WriteLine("Heavy graphics Weapon 3");
        Console.WriteLine("Heavy graphics Weapon 4");
        Console.WriteLine("Heavy graphics Weapon 5");
    }
}
[/code]

This example is something we can see in Assassins's Creed where this pattern might have been used. In early game there is a shop that has many unavailable options. Instead of loading all the resources required for the items it uses a proxy saying there is nothing available, so it saves lots of resources.

http://www.youtube.com/watch?v=whJi3fhwbW0
