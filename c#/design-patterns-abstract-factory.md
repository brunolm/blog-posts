---
title: "Design Patterns: Abstract Factory"
tags: [abstract-factory-pattern, c#, design-patterns]
---

The abstract factory design pattern is a way for you to be able to get different types or setups for objects by calling the same factory. The result returned from the create method is going to be determined by the factory type.
<!--more-->

For example, lets say we have a factory that create items to build a house. So we need material to build the floor, walls... But then imagine that those items could be made of different materials and have perhaps unique characteristics. To accomplish that with the abstract factory we can do like this:

[code language="csharp"]
public interface IItemFactory
{
    IItem CreateWall();

    IItem CreateFloor();
}
[/code]

And we would have two factories:

[code language="csharp"]

public class MetalFactory : IItemFactory
{
    public IItem CreateWall()
    {
        return new MetalWall();
    }

    public IItem CreateFloor()
    {
        return new MetalFloor();
    }
}

public class WoodFactory : IItemFactory
{
    public IItem CreateWall()
    {
        return new WoodWall();
    }

    public IItem CreateFloor()
    {
        return new WoodFloor();
    }
}
[/code]

And different types of material:

[code language="csharp"]
public class MetalWall : IItem { }
public class MetalFloor : IItem { }

public class WoodWall : IItem { }
public class WoodFloor : IItem { }
[/code]

Now we can use this structure. We could have a builder that is going to build a part of a house and we could determine what materials he is going to use by passing a factory to it.

[code language="csharp"]
public class Builder
{
    private IItemFactory itemFactory;

    public Builder(IItemFactory itemFactory)
    {
        this.itemFactory = itemFactory;
    }

    public void BuildFloor()
    {
        this.itemFactory.CreateFloor();
    }

    public void BuildWall()
    {
        this.itemFactory.CreateWall();
    }
}
[/code]

We can decide what the house is going to be built of by specifying which factory the builder is going to use:

[code language="csharp"]
var metalBuilder = new Builder(new MetalFactory());
var woodBuilder = new Builder(new WoodFactory());
[/code]

In a real life example, we could think of Starcraft using this pattern to create a base for each race. So calling:

[code language="csharp"]
player.CreateBase();
[/code]

Would create a Nexus, Command Center or Hatchet accordingly to the player's race.

<a href="https://brunolm.files.wordpress.com/2015/06/nexus_sc2_devrend3.jpg"><img class=" size-medium wp-image-388 alignleft" src="https://brunolm.files.wordpress.com/2015/06/nexus_sc2_devrend3.jpg?w=296" alt="Nexus_SC2_DevRend3" width="296" height="300" /></a>

<a href="https://brunolm.files.wordpress.com/2015/06/command_center_sc2_rend1.jpg"><img class="alignnone wp-image-386 size-medium" src="https://brunolm.files.wordpress.com/2015/06/command_center_sc2_rend1.jpg?w=300" alt="Command_Center_SC2_Rend1" width="300" height="300" /></a>
