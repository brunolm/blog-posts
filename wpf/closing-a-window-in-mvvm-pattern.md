---
title: Closing a window in MVVM pattern
tags: [c#, icommand, mvvm, wpf]
---

The <a href="https://brunolm.wordpress.com/2015/03/21/the-mvvm-pattern-in-wpf/" title="The MVVM pattern in WPF" target="_blank">MVVM pattern</a> says that the UI logic should be withing the View. Your ViewModel should not know about the view.

But, imagine the following scenario: you have two buttons on your screen, one to save changes and close and another to cancel and close. But how do you close the window if your view model does not know what is the window and does not know how to handle UI logic?
<!--more-->

The most interesting way I found to do this is using the mediator design pattern to implement an <a href="https://brunolm.wordpress.com/2015/03/01/messaging-eventaggregator/" title="Messaging – EventAggregator" target="_blank">EventAggregator</a> system.

To demonstrate it I will use MEF to keep a single instance of my <code>EventAggregator</code> across the system. For that I will annotate my class with the <code>ExportAttribute</code> (<code>using System.ComponentModel.Composition;</code>).

[code language="csharp"]
[Export]
public class EventAggregator
[/code]

And I will define a simple <a href="https://brunolm.wordpress.com/2015/03/04/using-mef-to-setup-dependency-injection/" title="Using MEF to setup Dependency Injection" target="_blank">Mef class</a> to handle it:

[code language="csharp"]
public class Mef
{
    static Mef()
    {
        Container = new CompositionContainer(
            new DirectoryCatalog(".", "MVVMCloseDialogs.*"));
    }

    public static CompositionContainer Container { get; private set; }
}
[/code]

On my View I can get a instance of it. I will also implement IListen interface to be able to handle messages sent by others:

[code language="csharp"]
public partial class DialogView
    : Window, IListen<CloseWindowMessage>
{
    private EventAggregator eventAggregator;

    public DialogView()
    {
        InitializeComponent();

        eventAggregator =
            Mef.Container.GetExportedValue<EventAggregator>();
        eventAggregator.Subscribe(this);
    }

    public void Handle(CloseWindowMessage message)
    {
        this.Close();
    }
}
[/code]

The CloseWindowMessage class:

[code language="csharp"]
public class CloseWindowMessage
{
    public bool? Result { get; set; }

    public object Sender { get; set; }
}
[/code]

I can then finally publish a message from my ViewModel notifying the view that it should close.

[code language="csharp"]
[PropertyChanged.ImplementPropertyChanged]
public class DialogViewModel
{
    private EventAggregator eventAggregator;

    public DialogViewModel()
    {
        eventAggregator =
            Mef.Container.GetExportedValue<EventAggregator>();

        CloseCommand = new RelayCommand(o =>
        {
            eventAggregator.Publish(
                new CloseWindowMessage
                {
                    Sender = this,
                    Result = true,
                }
            );
        });
    }

    public ICommand CloseCommand { get; set; }
}
[/code]

When the view receives the message it will call Handle which will close the window using the View's logic for it. This way you have a view model decoupled from the view.
