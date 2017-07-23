---
title: "ICommand and RelayCommand"
tags: [c#, icommand, relaycommand, wpf]
---

<div>To bind a command of a button you need to bind a property that is an implementation of an ICommand.</div>
<div></div>
<div>An ICommand is composed by:</div>
<div></div>
<!--more-->
<div>

[code language="csharp"]
event EventHandler CanExecuteChanged;
bool CanExecute(object parameter);
void Execute(object parameter);
[/code]

<div></div>
<div><code>CanExecuteChanged</code> is invoked when changes occur that can change whether or not the command can be executed.</div>
<div></div>
<div><code>CanExecute</code> will determine whether the command can be executed or not. If it returns false the button will be disabled on the interface.</div>
<div></div>
<div><code>Execute</code> runs the command logic.</div>
<div></div>
<div>With a simple implementation of <code>ICommand</code> I can create for example:</div>
<div></div>

[code language="csharp"]
public class NormalCommand : ICommand
{
    public event EventHandler CanExecuteChanged;

    public bool CanExecute(object parameter)
    {
        throw new NotImplementedException();
    }

    public void Execute(object parameter)
    {
        throw new NotImplementedException();
    }
}
[/code]

<div>However this does not allow me to have a different logic to my <code>CanExecute</code> or <code>Execute</code>. For each command I would have to implement a new class. To solve that problem there is the <code>RelayCommand</code> implementation, which is a command that can be instantiated passing the actions to be executed:</div>
<div></div>

[code language="csharp"]
public class RelayCommand : ICommand
{
    private Action<object> execute;
    private Func<object, bool> canExecute;

    public event EventHandler CanExecuteChanged
    {
        add { CommandManager.RequerySuggested += value; }
        remove { CommandManager.RequerySuggested -= value; }
    }

    public RelayCommand(Action<object> execute, Func<object, bool> canExecute = null)
    {
        this.execute = execute;
        this.canExecute = canExecute;
    }

    public bool CanExecute(object parameter)
    {
        return this.canExecute == null || this.canExecute(parameter);
    }

    public void Execute(object parameter)
    {
        this.execute(parameter);
    }
}
[/code]

<div></div>
<div>With this implementation I can specify what I want to execute when I create the command, so I don't have to implement a new class for each different action I want to take. Then I can call it using:</div>

[code language="csharp"]
var cmd1 = new RelayCommand(o => { /* do something 1 */ }, o => true);
var cmd2 = new RelayCommand(o => { /* do something 2 */ }, o => true);
[/code]

<div>The <code>CommandManager.RequerySuggested</code> handles events when something in the interface suggests that a requery should happen. If your ICommand adds the handlers to it then it will automatically update UI elements when the screen execute some actions. (e.g. lose focus on a TextBox)</div>
&nbsp;

</div>
