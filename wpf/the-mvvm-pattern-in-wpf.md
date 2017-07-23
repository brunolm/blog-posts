---
title: The MVVM pattern in WPF
tags: [c#, mvvm, wpf]
---

In WPF we have the Model-View-ViewModel (MVVM) pattern. This pattern was created to allow you to separate concerns in a way that your business logic is going to be decoupled from your interface.

What happens in this pattern is that your View is going to be purely an user interface. Your ViewModel is going to contain the interface logic, it will be connected to your View through bindings and communicate through notifications. And your Model (for example a database model class) will be able to exchange data directly with your ViewModel.

<a href="https://msdn.microsoft.com/en-us/library/gg405484%28v=pandp.40%29.aspx" target="_blank">From MSDN</a>:

<a href="https://brunolm.files.wordpress.com/2015/03/mvvm.png"><img src="https://brunolm.files.wordpress.com/2015/03/mvvm.png" alt="mvvm" width="600" height="176" class="alignnone size-full wp-image-319" /></a>
<!--more-->

So it is basically separated this way:

<h2>Model</h2>
<ul>
<li>Data</li>
</ul>

<h2>View</h2>
<ul>
<li><a href="https://brunolm.wordpress.com/2015/03/10/wpf-controls-panels/" title="WPF Controls: Panels" target="_blank">Panel controls</a></li>
<li><a href="https://brunolm.wordpress.com/2015/03/11/wpf-controls-form-controls/" title="WPF Controls: Form controls" target="_blank">Form controls</a></li>
<li><a href="https://brunolm.wordpress.com/2015/03/11/wpf-controls-items-controls/" title="WPF Controls: Items controls" target="_blank">Items controls</a></li>
<li><a href="https://brunolm.wordpress.com/2015/03/11/wpf-controls-styles-templates/" title="WPF Controls: Styles &amp; Templates" target="_blank">Styles &amp; Templates</a></li>
</ul>

<h2>ViewModel</h2>
<ul>
<li><a href="https://brunolm.wordpress.com/2015/03/01/data-binding/" title="Data Binding" target="_blank">Data Binding</a></li>
<li><a href="https://brunolm.wordpress.com/2015/03/01/icommand-and-relaycommand/" title="ICommand and RelayCommand" target="_blank">Command</a></li>
<li><a href="https://brunolm.wordpress.com/2015/03/05/nuget-package-fody/" title="Nuget Package: Fody" target="_blank">PropertyChanged</a></li>
<li><a href="https://brunolm.wordpress.com/2015/03/01/messaging-eventaggregator/" title="Messaging – EventAggregator" target="_blank">Messaging</a></li>
</ul>
