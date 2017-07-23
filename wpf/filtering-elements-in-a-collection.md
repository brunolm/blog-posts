---
title: Filtering elements in a collection
tags: [c#, filter, wpf]
---

In WPF we have the <code>CollectionView</code> which is the instance type that are bound to Items controls. The CollectionView allows the use of filters, sorting and other features.

To filter the results shown in a items control we can take advantage of the collection view and add a <code>Filter</code> method to it.
<!--more-->

Consider the following scenario:

[code language="csharp"]
public ObservableCollection<Dragon> Items { get; set; }

public ICollectionView ItemsView
{
    get { return CollectionViewSource.GetDefaultView(Items); }
}
[/code]


[code language="xml"]
<DataGrid ItemsSource="{Binding ItemsView}" />
[/code]

In the above code we are binding a collection view to the items control so we can add a filter to it. The next step is to create the filter. For that we have to assign a <code>Predicate&lt;object&gt;</code> (after having Items populated).

[code language="csharp"]
ItemsView.Filter = new Predicate<object>(o => Filter(o as Dragon));
[/code]

I've set it so when the view calls filter it is going to call my filter method passing each object in the collection. And then I filter the results I want with my custom logic.

[code language="csharp"]
private bool Filter(Dragon dragon)
{
    return Search == null
        || dragon.Name.IndexOf(Search, StringComparison.OrdinalIgnoreCase) != -1
        || dragon.OriginalName.IndexOf(Search, StringComparison.OrdinalIgnoreCase) != -1
        || dragon.RomajiName.IndexOf(Search, StringComparison.OrdinalIgnoreCase) != -1;
}
[/code]

In the method above I'm using <code>Search</code>, that is a property I will be binding to the screen to grab text from a textbox.

[code language="xml"]
<TextBox Text="{Binding Search, UpdateSourceTrigger=PropertyChanged}" />
[/code]


[code language="csharp"]
private string search;

public string Search
{
    get { return search; }
    set
    {
        search = value;
        NotifyPropertyChanged("Search");
        ItemsView.Refresh(); // required
    }
}
[/code]

When I set the Search property I'm telling the collection view to refresh. That causes the filter to be applied. If you don't call it then the list will remain the same.

Now if we change the text to be searched the data grid will automatically filter the results.

<a href="https://brunolm.files.wordpress.com/2015/07/2015-19-05-02-19-25-842.png"><img class="alignnone size-full wp-image-432" src="https://brunolm.files.wordpress.com/2015/07/2015-19-05-02-19-25-842.png" alt="2015-19-05 02-19-25-842" width="525" height="450" /></a>

<a href="https://brunolm.files.wordpress.com/2015/07/2015-20-05-02-20-46-590.png"><img class="alignnone size-full wp-image-434" src="https://brunolm.files.wordpress.com/2015/07/2015-20-05-02-20-46-590.png" alt="2015-20-05 02-20-46-590" width="525" height="450" /></a>

It is possible to have the collection view refresh automatically, to achieve that you need to inherit from a collection view and change the logic there. In the example bellow I'm saying that if my model implements INotifyPropertyChanged and a property named "Search" triggers a change then it will refresh itself.

[code language="csharp"]
public class NotifiableCollectionView : ListCollectionView
{
    public NotifiableCollectionView(IList sourceCollection, object model)
        : base(sourceCollection)
    {
        if (model is INotifyPropertyChanged)
            (model as INotifyPropertyChanged).PropertyChanged += NotifiableCollectionView_PropertyChanged;
    }

    void NotifiableCollectionView_PropertyChanged(object sender, PropertyChangedEventArgs e)
    {
        if (e.PropertyName == "Search")
            this.Refresh();
    }
}
[/code]

Our ICollectionView will be a NotifiableCollectionView instead of the default.

[code language="csharp"]
private ICollectionView itemsView;

public ICollectionView ItemsView
{
    get
    {
        if (itemsView == null)
        {
            itemsView = new NotifiableCollectionView(Items, this);
        }
        return itemsView;
    }
}
[/code]

So we can remove the refresh call:

[code language="csharp"]
private string search;

public string Search
{
    get { return search; }
    set
    {
        search = value;
        NotifyPropertyChanged("Search");
        // ItemsView.Refresh(); // no longer required
    }
}
[/code]

And if we add <a href="https://brunolm.wordpress.com/2015/03/05/nuget-package-fody/" target="_blank">Fody</a> then we can simplify to:

[code language="csharp"]
public string Search { get; set; }
[/code]
