---
title: "ViewModel Locator"
tags: [c#, locator, viewmodel, wpf]
---

<div>A ViewModelLocator is a class witch is going to map viewmodels to its properties. And on your views you can specify which viewmodel it should use.</div>
<div></div>
<div>It also allows you to use a different viewmodel during design time so you can see mock values while you are building the views.</div>
<div></div>
<!--more-->
<div>An example of a ViewModelLocator would be:</div>
<div>

[code language="csharp"]
public class ViewModelLocator
{
    private DependencyObject dummy = new DependencyObject();

    public IMainViewModel MainViewModel
    {
        get
        {
            if (IsInDesignMode())
            {
                return new MockMainViewModel();
            }

            return MefBootstrap.Container.GetExportedValue<IMainViewModel>();
        }
    }

    private bool IsInDesignMode()
    {
        return DesignerProperties.GetIsInDesignMode(dummy);
    }
}
[/code]

<div></div>
<div>And on App.xaml file you could include as a resource. Define the namespace on the class above and register it on the resources.</div>
<div></div>

[code language="csharp"]
xmlns:core="clr-namespace:YourNameSpace"
 
<Application.Resources>
    <core:ViewModelLocator x:Key="ViewModelLocator" />
</Application.Resources>
[/code]

<div></div>
<div>With the locator in your application resources you can refer to it as `{StaticResource ViewModelLocator}` anywhere in your application.</div>
<div></div>
<div>On your view you can then bind the DataContext to a property of the locator:</div>
<div></div>

[code language="csharp"]
<Window x:Class="WpfGuide.Views.MainView"
        ...
        DataContext="{Binding Path=MainViewModel,
            Source={StaticResource ViewModelLocator}}"
        >
[/code]

<div></div>
<div>With the example above I will have a mock viewmodel while I'm designing the application:</div>
<div><a href="https://brunolm.files.wordpress.com/2015/03/011.jpg"><img class="alignnone size-full wp-image-46" src="https://brunolm.files.wordpress.com/2015/03/011.jpg" alt="01" width="164" height="163" /></a></div>
<div></div>
<div>And real values when I'm running it:</div>
<div><a href="https://brunolm.files.wordpress.com/2015/03/02.jpg"><img class="alignnone size-full wp-image-47" src="https://brunolm.files.wordpress.com/2015/03/02.jpg" alt="02" width="163" height="161" /></a></div>
</div>
