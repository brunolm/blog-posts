---
title: "Deserializing interface properties with Json.NET"
tags: [c#, json, json.net]
---

Newtonsoft.json nuget package allows you to serialize and deserialize objects into json.

```
Install-Package Newtonsoft.Json
```

In this post I am going to show you how to handle a scenario where your models are structured after interfaces and you need to implement them, but then you also need to know what the concrete type is to be able to deserialize your json.

Some basic operations from Newtonsoft.Json are:

You can convert an object to Json using:

```csharp
JsonConvert.SerializeObject(main);
```

And convert it back using:

```csharp
YourType x = JsonConvert.DeserializeObject<YourType>(json);
```

It also supports dynamic objects

```csharp
dynamic dyn = JsonConvert.DeserializeObject(json);
// dyn.Stuff
```
<!--more-->

Those methods work just fine for concrete types, however if you have an interface in the middle you are going to get errors. For example, given the following structure:

```csharp
public interface IMainStuff
{
    ISubStuff SubStuff { get; set; }
}
public interface ISubStuff
{
    string Name { get; set; }
}

public class MainStuff : IMainStuff
{
    public ISubStuff SubStuff { get; set; }
}

public class SubStuff : ISubStuff
{
    public string Name { get; set; }
}
```

If you attempt to deserialize `MainStuff` you are going to get the following exception:

<blockquote>An unhandled exception of type 'Newtonsoft.Json.JsonSerializationException' occurred in Newtonsoft.Json.dll

Additional information: Could not create an instance of type ConsoleApplication1.Program+ISubStuff. Type is an interface or abstract class and cannot be instantiated. Path 'SubStuff.Name', line 1, position 20.</blockquote>

Json.NET does not know how to create the interface. If you want to be able to handle it you have to implement a converter.

```csharp
public class ConcreteConverter<T> : JsonConverter
{
    public override bool CanConvert(Type objectType) => true;

    public override object ReadJson(JsonReader reader,
     Type objectType, object existingValue, JsonSerializer serializer)
    {
        return serializer.Deserialize<T>(reader);
    }

    public override void WriteJson(JsonWriter writer,
        object value, JsonSerializer serializer)
    {
        serializer.Serialize(writer, value);
    }
}
```

And then tell your concrete class how to handle the interface property by annotating it with the converter information.

```csharp
public class MainStuff : IMainStuff
{
    [JsonConverter(typeof(ConcreteConverter<SubStuff>))]
    public ISubStuff SubStuff { get; set; }
}
```

<a href="https://brunolm.files.wordpress.com/2015/03/2015-14-18-07-14-37-003.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-14-18-07-14-37-003.png" alt="2015-14-18 07-14-37-003" width="549" height="228" class="alignnone size-full wp-image-297" /></a>
