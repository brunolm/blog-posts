---
title: Using Reflection in .NET
tags: [.net, c#, reflection]
---

Reflection uses the object of type <code>Type</code> that describes assemblies, modules, types...

Through reflection it is possible to do many different things, for example:
<ul>
<li>Dynamically create object instances</li>
<li>Dynamically invoke methods</li>
<li>Check if an object implements an interface</li>
<li>Manipulate attributes set on objects</li>
<li>Mock values for testing</li>
<li>Retrieve debug information</li>
</ul>

These are just a few things you can do with it. In this post I'm going to show a simple example on how to use it to get descriptions on enums.
<!--more-->

Say you want to display an enum in a dropdown. But you want to have code/description rather than just displaying the code. You can annotate your enum with the description attribute:

[code language="csharp"]
public enum PurposeKind
{
    Development,

    [Description("Functional Test")]
    Test,

    [Description("Unit Test")]
    UnitTest,
}
[/code]

And to get the description we can use reflection. I will be getting the value/description and then I will add it to a dictionary:

[code language="csharp"]
static void Main(string[] args)
{
    var valuesAndDescriptions = new Dictionary<PurposeKind, string>();

    // gets the Type that contains all the info required
    // to manipulate this type
    Type enumType = typeof(PurposeKind);

    // I will get all values and iterate through them
    var enumValues = enumType.GetEnumValues();

    foreach (PurposeKind value in enumValues)
    {
        // with our Type object we can get the information about
        // the members of it
        MemberInfo memberInfo =
            enumType.GetMember(value.ToString()).First();

        // we can then attempt to retrieve the
        // description attribute from the member info
        var descriptionAttribute =
            memberInfo.GetCustomAttribute<DescriptionAttribute>();

        // if we find the attribute we can access its values
        if (descriptionAttribute != null)
        {
            valuesAndDescriptions.Add(value,
                descriptionAttribute.Description);
        }
        else
        {
            valuesAndDescriptions.Add(value, value.ToString());
        }
    }
}
[/code]

Results in

[code]
Development,Development
Test,Functional Test
UnitTest,Unit Test
[/code]

<a href="https://msdn.microsoft.com/en-us/library/system.type%28v=vs.110%29.aspx" target="_blank">See System.Type on MSDN</a> for a full reference.
