---
title: "Nuget Package: Json.NET"
tags: [asp.net-mvc, c#, json.net, nuget-package]
---

<a href="http://www.newtonsoft.com/json" target="_blank">Json.NET</a> is a must have nuget package when you are working with web APIs. And it can be pretty handy in many other cases as well.

The <a href="http://www.newtonsoft.com/json/help/html/Samples.htm" target="_blank">documentation includes over a hundred examples</a> on how to use it.
<!--more-->

It can be used to easily Clone objects by serializing and deserializing:

[code language="csharp"]
public static T Clone<T>(this T source)
{
    if (Object.ReferenceEquals(source, null))
    {
        return default(T);
    }

    return JsonConvert.DeserializeObject<T>(
        JsonConvert.SerializeObject(source)
    );
}
[/code]

Json.NET can handle <a href="http://www.newtonsoft.com/json/help/html/SerializationGuide.htm" target="_blank">"a wide variety of .NET objects"</a>, it serializes the information required to revert it back later.

It is possible to map a property to a name but adding the attribute <code>JsonPropertyAttribute</code>:

[code language="csharp"]
public class Game
{
    public int ID { get; set; }

    public string Name { get; set; }

    [JsonProperty(propertyName: "price_value")]
    public decimal Price { get; set; }
}
[/code]

When serialized generates:
[code]
{"ID":1,"Name":"Breath of Fire IV","price_value":1337.00}
[/code]

Json can be parsed in a dynamic object:

[code language="csharp"]
public static void DynamicJsonExample()
{
    var editGameViewModel = new EditGameViewModel
    {
        Name = "Breath of Fire IV",
        Price = 1337.00M,
    };

    var json = JsonConvert.SerializeObject(editGameViewModel);

    dynamic jsonObj = JsonConvert.DeserializeObject(json);

    string name = jsonObj.Name; // Breath of Fire IV
    decimal price = jsonObj.Price; // 1337
    string expt = jsonObj.NotSerializedThingIsNull; // null
}
[/code]

<a href="http://stackoverflow.com/questions/tagged/json.net?sort=votes&amp;pageSize=50" target="_blank">Json.NET on Stack Overflow</a>
