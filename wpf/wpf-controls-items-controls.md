---
title: "WPF Controls: Items controls"
tags: [c#, controls, itemscontrols, wpf]
---

The controls that inherit from <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.itemscontrol%28v=vs.110%29.aspx#inheritanceContinued" target="_blank"><code>ItemsControl</code></a> are controls that support a collection of objects.

These controls can be used to display a collection of objects on the screen. For example, controls like <code>ListBox</code> and <code>ComboBox</code> can be used to allow the user to select an object from a collection.

<a href="https://brunolm.files.wordpress.com/2015/03/listbox.png"><img src="https://brunolm.files.wordpress.com/2015/03/listbox.png" alt="listbox" width="226" height="160" class="alignnone size-full wp-image-264" /></a>

<!--more-->

<h2>Items Controls</h2>

Items controls are everything that derives from <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.itemscontrol%28v=vs.110%29.aspx#inheritanceContinued" target="_blank">System.Windows.Controls.ItemsControl</a>.

<ul>
    <li><small>System.Windows.Controls.</small><strong>HeaderedItemsControl</strong></li>
    <li><small>System.Windows.Controls.Primitives.</small><strong>DataGridCellsPresenter</strong></li>
    <li><small>System.Windows.Controls.Primitives.</small><strong>DataGridColumnHeadersPresenter</strong></li>
    <li><small>System.Windows.Controls.Primitives.</small><strong>MenuBase</strong></li>
    <li><small>System.Windows.Controls.Primitives.</small><strong>Selector</strong></li>
    <li><small>System.Windows.Controls.Primitives.</small><strong>StatusBar</strong></li>
    <li><small>System.Windows.Controls.Ribbon.</small><strong>RibbonContextualTabGroupItemsControl</strong></li>
    <li><small>System.Windows.Controls.Ribbon.</small><strong>RibbonControlGroup</strong></li>
    <li><small>System.Windows.Controls.Ribbon.</small><strong>RibbonGallery</strong></li>
    <li><small>System.Windows.Controls.Ribbon.</small><strong>RibbonQuickAccessToolBar</strong></li>
    <li><small>System.Windows.Controls.Ribbon.</small><strong>RibbonTabHeaderItemsControl</strong></li>
    <li><small>System.Windows.Controls.</small><strong>TreeView</strong></li>
</ul>

<h3>HeaderedItemsControl</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.headereditemscontrol(v=vs.110).aspx" target="_blank">HeaderedItemsControl control</a> is a control that supports a collection of items with headers.

<h3>DataGridCellsPresenter</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.datagridcellspresenter%28v=vs.110%29.aspx" target="_blank">DataGridCellsPresenter control</a> is used by the Grid control template to display the cells.

<h3>DataGridColumnHeadersPresenter</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.datagridcolumnheaderspresenter%28v=vs.110%29.aspx" target="_blank">DataGridCellsPresenter control</a> is used by the Grid control template to display the header cells.

<h3>MenuBase</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.menubase%28v=vs.110%29.aspx" target="_blank">MenuBase control</a> is the base class for the <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.menu(v=vs.110).aspx" target="_blank">Menu</a> and <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.contextmenu(v=vs.110).aspx" target="_blank">ContextMenu</a> controls.

<h4>ContextMenu</h4>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.contextmenu(v=vs.110).aspx" target="_blank">ContextMenu control</a> is the menu that shows up when you right-click the element.

[code language="xml"]
<Label Content="red">
    <Label.ContextMenu>
        <ContextMenu>
            <MenuItem Header="_Copy" Command="{Binding CopyCommand}" />
        </ContextMenu>
    </Label.ContextMenu>
</Label>
[/code]

<h4>Menu</h4>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.menu(v=vs.110).aspx" target="_blank">Menu control</a> allows you to nest MenuItems forming a menu that can run commands.

[code language="xml"]
<Menu>
    <MenuItem Header="_File">
        <MenuItem Header="Quit" Command="{Binding QuitCommand}" />
    </MenuItem>
</Menu>
[/code]

<h3>Selector</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.selector%28v=vs.110%29.aspx" target="_blank">Selector control</a> is the base class for:

<ul>
    <li><small>System.Windows.Controls.</small><strong>ComboBox</strong></li>
    <li><small>System.Windows.Controls.</small><strong>ListBox</strong></li>
    <li><small>System.Windows.Controls.Primitives.</small><strong>MultiSelector</strong></li>
        <li>--- <small>System.Windows.Controls.</small><strong>DataGrid</strong></li>
    <li><small>System.Windows.Controls.Ribbon.</small><strong>Ribbon</strong></li>
    <li><small>System.Windows.Controls.</small><strong>TabControl</strong></li>
</ul>

<h4>ComboBox</h4>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.combobox(v=vs.110).aspx" target="_blank">ComboBox control</a> allows you to select a single option from the collection.

[code language="xml"]
<ComboBox>
    <ComboBoxItem Content="Development" />
    <ComboBoxItem Content="Test" />
</ComboBox>
[/code]

To bind an enum to a <code>ComboBox</code> you can use <a href="http://stackoverflow.com/a/4398752/340760" target="_blank">this approach posted on Stack Overflow</a>.

<h4>ListBox</h4>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.listbox(v=vs.110).aspx" target="_blank">ListBox control</a> allows you to select one or more items from a collection.

[code language="xml"]
<ListBox SelectionMode="Multiple">
    <ListBoxItem Content="Dev" />
    <ListBoxItem Content="Test" />
</ListBox>
[/code]


<h4>DataGrid</h4>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.datagrid(v=vs.110).aspx" target="_blank">DataGrid control</a> can be used to show tabular data. By default it auto generate columns by reading the public properties of the object.

[code language="xml"]
<DataGrid AutoGenerateColumns="True" ItemsSource="{Binding Items}" />
[/code]

<h4>TabControl</h4>
The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.tabcontrol(v=vs.110).aspx" target="_blank">TabControl control</a> allows you to place controls in different tabs.

[code language="xml"]
<TabControl>
    <TabItem Header="Home">
        Home Content
    </TabItem>
    <TabItem Header="Second">
        Second Content
    </TabItem>
</TabControl>
[/code]

<h3>StatusBar</h3>
The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.statusbar%28v=vs.110%29.aspx" target="_blank">StatusBar control</a> can contain a collection of controls that will be displayed.

[code language="xml"]
<StatusBar>
    <StatusBarItem>
        <Label Content="Status..." />
    </StatusBarItem>
    <StatusBarItem>
        <Label Content="10/10/2020 10:10" />
    </StatusBarItem>
</StatusBar>
[/code]

<h3>TreeView</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.forms.treeview%28v=vs.110%29.aspx" target="_blank">TreeView control</a> allows to bind items with hierarchy.

[code language="xml"]
<TreeView ItemsSource="{Binding Games}">
    <TreeView.ItemTemplate>
        <HierarchicalDataTemplate ItemsSource="{Binding Characters}">
            <TextBlock Text="{Binding Name}" />
        </HierarchicalDataTemplate>
    </TreeView.ItemTemplate>
</TreeView>
[/code]

<a href="https://brunolm.files.wordpress.com/2015/03/treeview.png"><img src="https://brunolm.files.wordpress.com/2015/03/treeview.png" alt="treeview" width="140" height="96" class="alignnone size-full wp-image-277" /></a>
