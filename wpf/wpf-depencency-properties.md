---
title: "WPF: Depencency Properties"
tags: [c#, dependency-property, wpf]
---

Dependency Properties allows you to extend a functionality, <a href="https://msdn.microsoft.com/en-us/library/ms752914%28v=vs.110%29.aspx" target="_blank">from MSDN</a>:

<blockquote>A dependency property provides functionality that extends the functionality of a property as opposed to a property that is backed by a field.</blockquote>

It is used to create bindable properties on objects deriving from <code>DependencyObject</code>, for example in controls. It is used all across WPF.

You can use it as well to create your own bindable properties.

For example:

<a href="https://brunolm.files.wordpress.com/2015/03/2015-31-13-05-31-24-043.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-31-13-05-31-24-043.png" alt="2015-31-13 05-31-24-043" width="232" height="168" class="alignnone size-full wp-image-285" /></a>

[code language="xml"]
<local:ExtendedButton DisplayInRed="True"
    Content="I'm red" />
<local:ExtendedButton DisplayInRed="False"
    Content="I'm NOT red" />

<local:ExtendedButton DisplayInRed="{Binding TrueValue}"
    Content="I'm red" />

<Separator />

<local:ExtendedButton2 DisplayInRed="True"
    Content="I'm red" />
<local:ExtendedButton2 DisplayInRed="False"
    Content="I'm NOT red" />

<!--Error, cannot bind-->
<!--<local:ExtendedButton2 DisplayInRed="{Binding TrueValue}"
    Content="I'm red" />-->
[/code]
<!--more-->

You can create a custom actions with properties...

[code language="csharp"]
public class ExtendedButton : Button
{
    public static readonly DependencyProperty DisplayInRedProperty =
        DependencyProperty.Register(nameof(DisplayInRed)
            , typeof(bool)
            , typeof(ExtendedButton)
            , new PropertyMetadata(DisplayInRedChanged));

    protected static void DisplayInRedChanged(DependencyObject d,
        DependencyPropertyChangedEventArgs ev)
    {
        bool displayInRed = (bool)ev.NewValue;

        if (displayInRed)
        {
            (d as Button).Background =
                new SolidColorBrush(
                    (Color)ColorConverter.ConvertFromString("red"));
        }
    }

    public bool DisplayInRed
    {
        get { return (Boolean)this.GetValue(DisplayInRedProperty); }
        set { this.SetValue(DisplayInRedProperty, value); }
    }
}
[/code]

[code language="csharp"]
// this way it doesn't work with bindings
public class ExtendedButton2 : Button
{
    private bool displayInRed;
    public bool DisplayInRed
    {
        get
        {
            return displayInRed;
        }
        set
        {
            displayInRed = value;

            if (displayInRed)
            {
                Background =
                    new SolidColorBrush(
                        (Color)ColorConverter.ConvertFromString("red"));
            }
        }
    }
}
[/code]

The <a href="https://msdn.microsoft.com/en-us/library/ms597501(v=vs.110).aspx" target="_blank">DependencyProperty Register</a> complete method has the following signature:

[code language="csharp"]
public static DependencyProperty Register(
    string name,
    Type propertyType,
    Type ownerType,
    PropertyMetadata typeMetadata,
    ValidateValueCallback validateValueCallback
)
[/code]

<ul>
    <li>name: defines the name of the property it will access</li>
    <li>propertyType: defines the type of the property it will access</li>
    <li>ownerType: defines the type of the object owner of the property it will access</li>
    <li>typeMetadata: can define default value; property changed callback; coerce value callback (adjust data; e.g. if value goes over the maximum allowed return the maximum allowed)</li>
    <li>validateValueCallback: callback to define if property value is valid or not (returning false throws an <code>ArgumentException</code>)</li>
</ul>

The naming convention is <code>Property</code> for the static definition of the DependencyProperty and then just <code></code> for the actual property.

So if you want to create a custom control and have bindable properties this is the way to do it.
