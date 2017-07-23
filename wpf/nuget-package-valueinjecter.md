---
title: Nuget Package: ValueInjecter
tags: [asp.net-mvc, c#, nuget-package, valueinjecter, wpf]
---

<a href="https://www.nuget.org/packages/ValueInjecter/" target="_blank">ValueInjecter</a> is a nuget package that allows you to inject values from one object to another.

<blockquote>ValueInjecter lets you define your own convention-based matching algorithms (ValueInjections) in order to match up (inject) source values to destination values. It is used for mapping Dto to Entity and back also for mapping IDataReader to objects, windows forms to object, basically anything. Also has support for flattening and unflattening.</blockquote>

One good use for ValueInjecter is when you are working with models and viewmodels. With it you can build models from viewmodels and viewmodels from models.
<!--more-->

ValueInjecter uses conventions to map properties. The default convention map properties by type and name, when they match the values are copied.

<h2>WPF Example</h2>

Given that I have a ViewModel called <code>EditGameViewModel</code> and a Model called <code>Game</code> as follows:

[code language="csharp"]
public class EditGameViewModel : INotifyPropertyChanged
{
    private string name;
    public string Name
    {
        get { return name; }
        set { name = value; NotifyProp(); }
    }

    private decimal price;
    public decimal Price
    {
        get { return price; }
        set { price = value; NotifyProp(); }
    }

    private ICommand saveCommand;
    public ICommand SaveCommand
    {
        get { return saveCommand; }
        set { saveCommand = value; NotifyProp(); }
    }

    public event PropertyChangedEventHandler PropertyChanged;
    public void NotifyProp([CallerMemberName] string caller = null)
    {
        if (PropertyChanged != null)
            PropertyChanged(this,
                new PropertyChangedEventArgs(caller));
    }
}

public class Game
{
    public int ID { get; set; }

    public string Name { get; set; }

    public decimal Price { get; set; }
}
[/code]

I can inject values from the ViewModel to the Model:

[code language="csharp"]
public void ViewModel_to_Model_Example()
{
    var editGameViewModel = new EditGameViewModel
    {
        Name = "Breath of Fire IV",
        Price = 1337.00M,
        SaveCommand = new RelayCommand(() => { })
    };

    var game = new Game();

    game.InjectFrom(editGameViewModel);
}
[/code]
<a href="https://brunolm.files.wordpress.com/2015/03/beforeinjecter.png"><img src="https://brunolm.files.wordpress.com/2015/03/beforeinjecter.png" alt="beforeinjecter" width="522" height="639" class="alignnone size-full wp-image-152" /></a>

And I can also inject from the Model to the ViewModel:

[code language="csharp"]
public void Model_to_ViewModel_Example()
{
    var game = new Game
    {
        Name = "Breath of Fire IV",
        Price = 1337.00M,
    };

    var editGameViewModel = new EditGameViewModel();

    editGameViewModel.InjectFrom(game);
}
[/code]
<a href="https://brunolm.files.wordpress.com/2015/03/beforeinjecter1.png"><img src="https://brunolm.files.wordpress.com/2015/03/beforeinjecter1.png" alt="beforeinjecter" width="527" height="639" class="alignnone size-full wp-image-153" /></a>

<h2>MVC example</h2>

In MVC we can use ValueInjecter to easily get posted values and map to our model. By having the ViewModel on the client-side you can annotate your model properties with any required validations you need, even custom validations and you do not have to worry about transferring from the ViewModel to the Model because ValueInjecter does that for you.

[code language="csharp"]
[HttpPost]
public async Task<ActionResult> Index(GameViewModel gameViewModel)
{
    var game = new Game();
    game.InjectFrom(gameViewModel);

    bool saved = await SaveGameAsync(game);
    return View(game);
}
[/code]

You can also retrieve an object from the database and transfer its values to a ViewModel and give it to the View, so the user can edit the values:

[code language="csharp"]
public ActionResult Index(int id)
{
    var game = GameService.Get(id);
    var gameViewModel = new GameViewModel();

    gameViewModel.InjectFrom(game);

    return View(gameViewModel);
}
[/code]

<h2>Conventions</h2>

As I mentioned before, the default convention is by type and name. But this can be changed at will by calling the inject method passing the type of the convention as the generic type parameter.

[code language="csharp"]
game.InjectFrom<SomethingConvention>(editGameViewModel);
[/code]

To implement a custom convention you have to inherit from <code>ConventionInjection</code> class.

I am going to implement a convention that only copy properties when they have the same name and are of the string.

[code language="csharp"]
public class StringOnlyConvention : ConventionInjection
{
    // abstract: you must implement
    // determines when values should be copied
    protected override bool Match(ConventionInfo c)
    {
        return c.SourceProp.Type == c.TargetProp.Type
            && c.SourceProp.Name == c.TargetProp.Name
            && c.SourceProp.Type == typeof(string);
    }

    // virtual: you can change
    protected override void Inject(object source, object target)
    {
        base.Inject(source, target);
    }

    // virtual: you can change
    protected override object SetValue(ConventionInfo c)
    {
        return base.SetValue(c);
    }
}
[/code]

[code language="csharp"]
public static void ViewModel_to_Model_Convention_Example()
{
    var editGameViewModel = new EditGameViewModel
    {
        Name = "Breath of Fire IV",
        Price = 1337.00M,
        SaveCommand = new RelayCommand(() => { })
    };

    var game = new Game();

    game.InjectFrom<StringOnlyConvention>(editGameViewModel);
}
[/code]

<a href="https://brunolm.files.wordpress.com/2015/03/2015-30-06-07-30-49-797.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-30-06-07-30-49-797.png" alt="2015-30-06 07-30-49-797" width="608" height="328" class="alignnone size-full wp-image-157" /></a>
