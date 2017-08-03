---
title: "WPF TreeView with hierarchical data"
tags: [c#, treeview, wpf]
---

<a href="https://msdn.microsoft.com/en-us/library/system.windows.controls.treeview%28v=vs.110%29.aspx" target="_blank">TreeView control</a> allows you to create an hierarchical structure. You can tell it to bind elements and also how it should bind the children, grandchildren and so on.

One simple example is as follows:

```xml
<TreeView>
  <TreeViewItem Header="Character 1">
    <TreeViewItem Header="Character 1's child">
      <TreeViewItem Header="Character 1's child's child"/>
    </TreeViewItem>
    <TreeViewItem Header="12345"/>
  </TreeViewItem>
 <TreeViewItem Header="Another char">
    <TreeViewItem Header="Char Bla"/>
    <TreeViewItem Header="Char Foo"/>
    <TreeViewItem Header="98765"/>
  </TreeViewItem>
</TreeView>
```
<!--more-->

To bind in a TreeView you can have a `ObservableCollection` with your items and in the object you are binding you can have another `ObservableCollection` which will be a collection with all the child nodes. For example:

```csharp
public class Tag
{
    public string Name { get; set; }

    public ObservableCollection<Tag> Children { get; set; }
}
```

Having this structure you can bind the hierarchical data in a TreeView:

```xml
<TreeView ItemsSource="{Binding Tags}">
    <TreeView.ItemTemplate>
        <HierarchicalDataTemplate ItemsSource="{Binding Children}">
            <TextBlock Text="{Binding Name}" />
        </HierarchicalDataTemplate>
    </TreeView.ItemTemplate>
</TreeView>
```

You can also have different types:

```csharp
public class Game
{
    public string Name { get; set; }

    public ObservableCollection<Character> Characters { get; set; }
}

public class Character
{
    public string Name { get; set; }
}
```

One issue that comes along with the hierarchical binding is that the context inside does not have access to the context of your window. It means that if you have an `ICommand` in your view model you cannot access it directly.

Imagine that you have an `ICommand` called `ShowInfoCommand`. You can set the ContextMenu DataContext through a reference, like this:

```xml
<TreeView ItemsSource="{Binding Games}" x:Name="tree">
    <TreeView.ItemTemplate>
        <HierarchicalDataTemplate ItemsSource="{Binding Characters}">
            <TextBlock Text="{Binding Name}">
                <TextBlock.ContextMenu>
                    <ContextMenu DataContext="{x:Reference Name=tree}">
                        <MenuItem Header="Show info"
                            Command="{Binding Path=DataContext.ShowInfoCommand}"
                        />
                    </ContextMenu>
                </TextBlock.ContextMenu>
            </TextBlock>
        </HierarchicalDataTemplate>
    </TreeView.ItemTemplate>
</TreeView>
```

However this way you lose access to the actual context (you would not be able to get the element being bound).

To workaround this issue there is way to climb back to your main context and retrieve the command. To do that you have to set the Tag property, of the object that is going to contain the ContextMenu, to the window.

```csharp
// relative
Tag="{Binding RelativeSource={RelativeSource Mode=FindAncestor, AncestorType={x:Type Window}}}"
// or by name
Tag="{Binding ElementName=wndName}"
```

Having that we can bind in the context menu items. In the menu items we can refer to the context menu by using

```
RelativeSource={RelativeSource Mode=FindAncestor, AncestorType=ContextMenu}
```

From the context menu we can refer to the element where it is set by using `PlacementTarget`.

From the element that contains the context menu we can access the window which was bound to the Tag property.

And finally from the window access our command.

Putting it all together:

```xml
<TreeView ItemsSource="{Binding Games}">
    <TreeView.ItemTemplate>
        <HierarchicalDataTemplate ItemsSource="{Binding Characters}">
            <TextBlock Text="{Binding Name}" Tag="{Binding RelativeSource={RelativeSource Mode=FindAncestor, AncestorType={x:Type Window}}}">
                <TextBlock.ContextMenu>
                    <ContextMenu>
                        <MenuItem Header="Show info"
                            Command="{Binding Path=PlacementTarget.Tag.DataContext.ShowInfoCommand, RelativeSource={RelativeSource Mode=FindAncestor, AncestorType=ContextMenu}}"
                            CommandParameter="{Binding}"
                        />
                    </ContextMenu>
                </TextBlock.ContextMenu>
            </TextBlock>
        </HierarchicalDataTemplate>
    </TreeView.ItemTemplate>
</TreeView>
```
