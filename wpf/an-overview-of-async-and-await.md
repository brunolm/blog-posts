---
title: "An overview of async and await"
tags: [async, await, c#, wpf]
---

The <code>async</code> and <code>await</code> keywords were introduced on .NET 4.0.

In the past asynchronous operations were achieved by invoking methods and handling callbacks. Or by starting new threads and having to handle them. That way you have to focus on handling the asynchronous operations and it also caused your code to be split all over the place due the callbacks and complex error handling.

The <code>async</code> and <code>await</code> makes it possible so that you can create your code as you would when performing synchronous operations.
<!--more-->

I am going to build a screen with a progress bar and some buttons, like this:

<a href="https://brunolm.files.wordpress.com/2015/03/2015-56-05-07-56-55-836.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-56-05-07-56-55-836.png" alt="2015-56-05 07-56-55-836" width="525" height="160" class="alignnone size-full wp-image-123" /></a>

The XAML code for it is:

[code language="xml"]
<StackPanel Margin="10">
    <StackPanel.Resources>
        <Style TargetType="Button">
            <Setter Property="Margin" Value="10,5,0,0" />
            <Setter Property="Padding" Value="10,5" />
        </Style>
    </StackPanel.Resources>

    <ProgressBar Minimum="0" Maximum="100" Height="50"
        Value="{Binding ProgressValue}" />
    <TextBlock Text="{Binding RandomGuid}" />

    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="Auto" />
            <ColumnDefinition Width="*" />
        </Grid.ColumnDefinitions>

        <Button Content="Do something else"
            Command="{Binding SomethingCommand}" />

        <StackPanel Orientation="Horizontal"
            HorizontalAlignment="Right" Grid.Column="1">
            <Button Content="Run"
                Command="{Binding RunCommand}" />
            <Button Content="Run async"
                Command="{Binding RunAsyncCommand}" />
            <Button Content="Reset"
                Command="{Binding ResetCommand}" />
        </StackPanel>
    </Grid>
</StackPanel>
[/code]

On this screen I have a couple of run buttons and a "Do something else" button.

When I click the Run button I am going to fill the progress bar from 0 to 100 without any asynchronous operations:

[code language="csharp"]
private void RunExecute(object obj)
{
    for (ProgressValue = 0; ProgressValue <= 100; ++ProgressValue)
    {
        Thread.Sleep(33);
    }
}
[/code]

If I try to click "Do something else" button while the run command is executing nothing visual is going to happen because the UI will be frozen, but it will still queue your actions.

We can change this code to perform asynchronous by tagging the method with <code>async</code>. When we say a method is <code>async</code> we have to <code>await</code> some action. In this case I will <code>await</code> a task to run:

[code language="csharp"]
private async void RunAsyncExecute(object obj)
{
    await Task.Run(() =>
    {
        for (ProgressValue = 0; ProgressValue <= 100; ++ProgressValue)
        {
            Thread.Sleep(33);
        }
    });
}
[/code]

The <code>await</code> keyword is only available inside an <code>async</code> method. It means that it is going to wait for the operation to end before continuing, but only inside the async method. It means it will not lock our UI thread, it locks another thread.

If I run my application now that my method is in an asynchronous format I can "Do something else" at the same time my process is running:

<a href="https://brunolm.files.wordpress.com/2015/03/async2.gif"><img src="https://brunolm.files.wordpress.com/2015/03/async2.gif" alt="Async" width="480" height="147" class="alignnone size-full wp-image-127" /></a>

An <code>async</code> method accepts 3 types of return values: <code>void</code>, <code>Task</code> or <code>Task&lt;T&gt;</code>.

When you return <code>void</code> you are saying that the operation will happen asynchronous and will not return anything at all.

[code language="csharp"]
public async void VoidAsync()
{
    await Task.Run(() => { Thread.Sleep(2000); });
}

// usage:
VoidAsync();
[/code]

When you return <code>Task</code> you are saying that the operation is returning.

[code language="csharp"]
public async Task TaskAsync()
{
    await Task.Run(() => { Thread.Sleep(2000); });
}

// usage:
await TaskAsync();
[/code]

When you return <code>Task&lt;T&gt;</code> you are saying that the operation is returning and it returns a value of type <code>T</code>.

[code language="csharp"]
public async Task<string> TaskStringAsync()
{
    return await Task.Run(() =>
    {
        Thread.Sleep(2000);
        return "Hello world";
    });
}

// usage:
string result = await TaskStringAsync();
[/code]

This way you can have your asynchronous operations isolated in methods and it looks almost like you are just building normal code. You code stays very clean and organized.
