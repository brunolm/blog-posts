---
title: "View validation with Data Annotations and custom client validations in MVC"
tags: [asp.net-mvc, c#, data-annotations, validation]
---

In the post <a title="Using Data Annotations to validate models" href="https://brunolm.wordpress.com/2015/03/04/using-data-annotations-to-validate-models/" target="_blank">Using Data Annotations to validate models</a> I showed that it is possible to keep validations in attributes.

In this post I am going to show how to apply these validations on the client-side.

By default when you create a standard MVC project it creates all initial structure for you, including the setup of the scripts. To enable client-side validation you need two keys under appSettings in your web.config file (which are set by default in the standard template):
<!--more-->

[code language="csharp"]
<add key="ClientValidationEnabled" value="true" />
<add key="UnobtrusiveJavaScriptEnabled" value="true" />
[/code]

You will also need to include both jQuery and jQuery.validate on your pages. By default jQuery is included, but jQuery.validate is not included on _Layout.cshtml, make sure you include it. You also have to put the scripts in order.

[code language="csharp"]
@Scripts.Render("~/bundles/jquery")
@Scripts.Render("~/bundles/jqueryval")
[/code]

On the default MVC there are some bundles setup, the code above is making use of it. You could also manually include the scripts with the script tag.

With the setup ready we can start coding. I will create a model with some data annotations:

[code language="csharp"]
public class Game
{
    [Required]
    [StringLength(5)]
    public string Name { get; set; }

    [Required]
    [StringLength(5)]
    public string Genre { get; set; }

    [Range(13, 40)]
    public string Age { get; set; }
}
[/code]

And on my view I am going to create a form with it:

[code language="csharp"]
@using (Html.BeginForm())
{
    <div>
        <div>
            @Html.LabelFor(o => o.Name)
            @Html.TextBoxFor(o => o.Name)
            <br />
            @Html.ValidationMessageFor(o => o.Name)
        </div>
        <br />
        <div>
            @Html.LabelFor(o => o.Genre)
            @Html.TextBoxFor(o => o.Genre)
            <br />
            @Html.ValidationMessageFor(o => o.Genre)
        </div>
        <br />
        <div>
            @Html.LabelFor(o => o.Age)
            @Html.TextBoxFor(o => o.Age)
            <br />
            @Html.ValidationMessageFor(o => o.Age)
        </div>

        <br />
        <br />

        <input type="submit" value="Submit" />
    </div>
}
[/code]

The result will be:

<a href="https://brunolm.files.wordpress.com/2015/03/2015-46-04-08-46-23-925.png"><img class="alignnone size-full wp-image-102" src="https://brunolm.files.wordpress.com/2015/03/2015-46-04-08-46-23-925.png" alt="2015-46-04 08-46-23-925" width="423" height="311" /></a>

The object being validated receives the class <code>input-validation-error</code> which can be styled. And the error message receives <code>field-validation-error</code> which can also be styled. For example, if we want to display a red border and red message:

[code language="css"]
.input-validation-error
{
    border: 1px solid red;
}
.field-validation-error
{
    color: red;
}
[/code]

<h2>Custom Client Validation</h2>

To make a custom validation and allow it to run on the client-side we have to create a new attribute that inherits from the <code>ValidationAttribute</code> and implements <code>IClientValidatable</code> interface. For example:

[code language="csharp"]
public class NoSwearWords : ValidationAttribute, IClientValidatable
{
    protected override ValidationResult IsValid(object value,
        ValidationContext validationContext)
    {
        string val = value as string ?? "";

        bool valid = !new string[] { "Pussy", "Fuck" }
            .Any(o => val.Contains(o));

        if (!valid)
            return new ValidationResult(
                base.FormatErrorMessage(base.ErrorMessage));

        return null;
    }

    // client-side
    public IEnumerable<ModelClientValidationRule>
        GetClientValidationRules(ModelMetadata metadata
                               , ControllerContext context)
    {
        var rule = new ModelClientValidationRule();

        rule.ValidationType = "noswearwords";
        rule.ErrorMessage = "You cannot use swear words over here";

        yield return rule;
    }
}
[/code]

I am telling it that on the client-side I have a jQuery validator method called "noswearwords" (lowercase name required).

I will decorate the property <code>Comment</code> with it:

[code language="csharp"]
[NoSwearWords]
public string Comment { get; set; }
[/code]

To implement this validation on the client side I have to create the method "noswearwords" and register it on the adapters:

[code language="javascript"]
<script type="text/javascript">

    $.validator.addMethod("noswearwords",
        function (value, element, param) {
            return !/Pussy|Fuck/i.test(value);
        });

    $.validator.unobtrusive.adapters.add("noswearwords", {},
        function (options) {
            options.rules["noswearwords"] = true;
            options.messages["noswearwords"] = options.message;
        });

</script>
[/code]

Everything else is done automatically for you:

<a href="https://brunolm.files.wordpress.com/2015/03/2015-26-04-09-26-18-429.png"><img src="https://brunolm.files.wordpress.com/2015/03/2015-26-04-09-26-18-429.png" alt="2015-26-04 09-26-18-429" width="413" height="377" class="alignnone size-full wp-image-103" /></a>
