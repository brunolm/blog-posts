---
title: WPF Controls: Panels
tags: [c#, controls, panel-controls, wpf]
---

Windows Presentation Foundation (WPF) has the called Panel controls. Those are controls that can contain a set of child controls.

Each Panel has its own particular way of organizing controls.

<a href="https://brunolm.files.wordpress.com/2015/03/2015-57-10-10-57-21-365.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-57-10-10-57-21-365.png" alt="2015-57-10 10-57-21-365" width="432" height="155" class="alignnone size-full wp-image-230" /></a>

<!--more-->

<h2>Panel Controls</h2>

Panel controls are everything that derives from <code>System.Windows.Controls.Panel</code>. Their main purpose is to group a set of controls in a container.

<ul>
    <li><small>System.Windows.Controls.</small><strong>Canvas</strong></li>
    <li><small>System.Windows.Controls.</small><strong>DockPanel</strong></li>
    <li><small>System.Windows.Controls.</small><strong>Grid</strong></li>
    <li><small>System.Windows.Controls.Primitives.</small><strong>TabPanel</strong></li>
    <li><small>System.Windows.Controls.Primitives.</small><strong>ToolBarOverflowPanel</strong></li>
    <li><small>System.Windows.Controls.Primitives.</small><strong>UniformGrid</strong></li>
    <li><small>System.Windows.Controls.Ribbon.Primitives.</small><strong>RibbonContextualTabGroupsPanel</strong></li>
    <li><small>System.Windows.Controls.Ribbon.Primitives.</small><strong>RibbonGalleryCategoriesPanel</strong></li>
    <li><small>System.Windows.Controls.Ribbon.Primitives.</small><strong>RibbonGalleryItemsPanel</strong></li>
    <li><small>System.Windows.Controls.Ribbon.Primitives.</small><strong>RibbonGroupItemsPanel</strong></li>
    <li><small>System.Windows.Controls.Ribbon.Primitives.</small><strong>RibbonQuickAccessToolBarOverflowPanel</strong></li>
    <li><small>System.Windows.Controls.Ribbon.Primitives.</small><strong>RibbonTabHeadersPanel</strong></li>
    <li><small>System.Windows.Controls.Ribbon.Primitives.</small><strong>RibbonTabsPanel</strong></li>
    <li><small>System.Windows.Controls.Ribbon.Primitives.</small><strong>RibbonTitlePanel</strong></li>
    <li><small>System.Windows.Controls.</small><strong>StackPanel</strong></li>
    <li><small>System.Windows.Controls.</small><strong>VirtualizingPanel</strong></li>
    <li><small>System.Windows.Controls.</small><strong>WrapPanel</strong></li>
</ul>

Note: This post doesn't cover <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.ribbon.primitives(v=vs.110).aspx" target="_blank">Ribbon</a> Panels, but basically they are all the panel types that compose a ribbon bar.

<h3>Canvas</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.canvas(v=vs.110).aspx" target="_blank">Canvas control</a> allows you to add controls to any position on the screen by informing the coordinates. This is the control you want when developing a game, because you can draw on it.

[code language="xml"]
<Canvas>
    <TextBlock Text="Coord =" Canvas.Top="10" Canvas.Left="50" />
</Canvas>
[/code]

<h3>DockPanel</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.dockpanel(v=vs.110).aspx" target="_blank">DockPanel control</a> can define where elements will be docked within it. We can specify where the elements will be docked by setting <code>DockPanel.Dock</code> to the position where they should be docked.
If the element is inside the DockPanel and is not specifying a position it is going to use the remaining space.

[code language="xml"]
<DockPanel>
    <Button Background="Green" DockPanel.Dock="Top" Height="25" />
    <Button Background="Blue" DockPanel.Dock="Left" Width="25" />
    <Button Background="Orange" DockPanel.Dock="Right" Width="25" />
    <Button Background="Yellow" DockPanel.Dock="Bottom" Height="25" />
    <Button Background="Purple" />
</DockPanel>
[/code]

The above code will result in the image bellow. Notice that elements docked last have less space available to them than the elements docked first.

<a href="https://brunolm.files.wordpress.com/2015/03/dockpanel.jpg"><img src="https://brunolm.files.wordpress.com/2015/03/dockpanel.jpg" alt="dockpanel" width="220" height="197" class="alignnone size-full wp-image-216" /></a>

<h3>Grid</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.grid(v=vs.110).aspx" target="_blank">Grid control</a> allows you to define rows and columns by creating <code>ColumnDefinitions</code> and <code>RowDefinitions</code>.

You can set their size to a number of pixels, <code>Auto</code> (which means resize itself to the contents occupied space), "*" or "N*" (* = give me what is left; 2* = give me two pieces of what is left; 5* = five pieces of what is left...).

And then to place the controls in their respective rows and columns you add <code>Grid.Row="X"</code> and <code>Grid.Column="Y"</code> to the controls tag. You can also set <code>Grid.RowSpan</code> and <code>Grid.ColumnSpan</code> to occupy more rows/columns.

[code language="xml"]
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="25" />
        <ColumnDefinition Width="Auto" />
        <ColumnDefinition Width="*" />
        <ColumnDefinition Width="2*" />
    </Grid.ColumnDefinitions>

    <Grid.RowDefinitions>
        <RowDefinition Height="25" />
        <RowDefinition Height="Auto" />
        <RowDefinition Height="*" />
        <RowDefinition Height="3*" />
    </Grid.RowDefinitions>

    <Button Content="B" Grid.Row="0" Grid.Column="0" />
    <Button Content="B" Grid.Row="0" Grid.Column="1" />
    <Button Content="B" Grid.Row="0" Grid.Column="2" />
    <Button Content="B" Grid.Row="0" Grid.Column="3" Height="44" />

    <Button Content="B" Grid.Row="1" Grid.Column="0" />
    <Button Content="B" Grid.Row="1" Grid.Column="1" Height="50" />
    <Button Content="B" Grid.Row="1" Grid.Column="2" />
    <Button Content="B" Grid.Row="1" Grid.Column="3" />

    <Button Content="Button" Grid.Row="2" Grid.Column="0"
            Grid.RowSpan="2" Grid.ColumnSpan="4"
            />

</Grid>
[/code]

Generates:

<a href="https://brunolm.files.wordpress.com/2015/03/2015-17-10-10-17-00-228.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-17-10-10-17-00-228.png" alt="2015-17-10 10-17-00-228" width="436" height="319" class="alignnone size-full wp-image-225" /></a>

<h3>TabPanel</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.tabpanel(v=vs.110).aspx" target="_blank">TabPanel control</a> is the control used internally by the TabControl to contain the set of tabs.

[code language="xml"]
<TabControl>
    <TabItem Header="Home" IsSelected="True">
        <Label Content="Hi Home" />
    </TabItem>
    <TabItem Header="Tab1" IsSelected="True">
        <Label Content="Hi Tab1" />
    </TabItem>
    <TabItem Header="Tab2" IsSelected="True">
        <Label Content="Hi Tab2" />
    </TabItem>
</TabControl>
[/code]

<a href="https://brunolm.files.wordpress.com/2015/03/tabpanel.png"><img src="https://brunolm.files.wordpress.com/2015/03/tabpanel.png" alt="tabpanel" width="421" height="98" class="alignnone size-full wp-image-229" /></a>

You can use it to create a similar look using some controls. It is somewhat similar to a horizontal oriented StackPanel. For example:

[code language="xml"]
<TabPanel>
    <Button Content="Button 1" />
    <Button Content="Button 2" />
    <Button Content="Button 3" />
    <Button Content="Button 4" />
</TabPanel>
[/code]

<h3>ToolBarOverflowPanel</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.toolbaroverflowpanel(v=vs.110).aspx" target="_blank">ToolBarOverflowPanel</a> control is used internally by the toolbar to handle overflow of items. When there are more items it can show the extra content is added under the arrow button.

<h3>UniformGrid</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.primitives.uniformgrid(v=vs.110).aspx" target="_blank">UniformGrid control</a> renders equal sized columns and rows. You can specify the number of columns and rows it is going to generate and the controls declared inside will be placed in their respective row/column by the order they are declare. For example:

[code language="xml"]
<UniformGrid Columns="2" Rows="3" Height="100"
    VerticalAlignment="Top">
    <Label Content="Name" VerticalAlignment="Center" />
    <TextBox VerticalAlignment="Center" />

    <Label Content="RequiredAge" VerticalAlignment="Center" />
    <TextBox VerticalAlignment="Center" />

    <Label Content="Actvie" VerticalAlignment="Center" />
    <TextBox VerticalAlignment="Center" />
</UniformGrid>
[/code]

Results in:

<a href="https://brunolm.files.wordpress.com/2015/03/2015-57-10-10-57-21-365.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-57-10-10-57-21-365.png" alt="2015-57-10 10-57-21-365" width="432" height="155" class="alignnone size-full wp-image-230" /></a>

<h3>StackPanel</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.stackpanel(v=vs.110).aspx" target="_blank">StackPanel control</a> is the simplest and easiest control to use. It simply displays elements by the order they are declare, by default it has the <code>Orientation</code> set to <code>Vertical</code> which causes the controls to render one above the other:

[code language="xml"]
<StackPanel>
    <Button Content="Button" />
    <Button Content="Button" />
    <Button Content="Button" />
</StackPanel
[/code]

<a href="https://brunolm.files.wordpress.com/2015/03/2015-11-10-11-11-46-891.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-11-10-11-11-46-891.png" alt="2015-11-10 11-11-46-891" width="422" height="122" class="alignnone size-full wp-image-234" /></a>

You can manually set the Orientation to Horizontal, which will cause elements to be rendered that way:

[code language="xml"]
<StackPanel Orientation="Horizontal">
    <Button Content="Button" />
    <Button Content="Button" />
    <Button Content="Button" />
</StackPanel
[/code]

<a href="https://brunolm.files.wordpress.com/2015/03/2015-12-10-11-12-46-288.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-12-10-11-12-46-288.png" alt="2015-12-10 11-12-46-288" width="425" height="100" class="alignnone size-full wp-image-235" /></a>

<h3>VirtualizingPanel</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.virtualizingpanel(v=vs.110).aspx" target="_blank">VirtualizingPanel control</a> is an abstract control. The types deriving from it can set <code>IsVirtualizing</code> to true indicating the control will only draw the controls in the screen that can be visible. The other elements aren't rendered unless you scroll them into view.

Example:

[code language="xml"]
<ListBox VirtualizingStackPanel.IsVirtualizing="True">
    <ListBoxItem Content="Test" />
    ...
</ListBox>
[/code]

<h3>WrapPanel</h3>

The <a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.wrappanel(v=vs.110).aspx" target="_blank">WrapPanel control</a> can be used to handle wrapping when the contents of the panel go over its size.

<a href="https://brunolm.files.wordpress.com/2015/03/ezgif-com-crop.gif"><img src="https://brunolm.files.wordpress.com/2015/03/ezgif-com-crop.gif" alt="ezgif.com-crop" width="477" height="141" class="alignnone size-full wp-image-237" /></a>
