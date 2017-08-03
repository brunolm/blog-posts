---
title: "Installing and using Secret Manager on ASP.NET Core"
tags: [application-secret, asp.net-core, c#]
---

In your ASP.NET Core application you can load settings from a file named `secrets.json` that can store API ids and secrets. The default generated template includes:

```csharp
if (env.IsDevelopment())
{
    builder.AddUserSecrets();
}
```

That is going to add that file only on a development environment. So the whole point of using this secret storage is to avoid having your ClientId and ClientSecret exposed on source control. In production you can have it stored on environment settings, the generated template includes:

```csharp
builder.AddEnvironmentVariables();
```

Which is going to add the environment variables on your application configuration.
<!--more-->

In order to do that first test your environment by typing `dnx` in the command prompt. If it doesn't find dnx then run the following:

```
cd %userprofile%\.dnx\runtimes\dnx-coreclr-win-x64.1.0.0-rc1-update1\bin
dnvm upgrade
```

This is going to update the path and other things, after that you can run this other command to install the SecretManager:

```
dnu commands install Microsoft.Extensions.SecretManager
```

To finally store the application secrets you can run (on your project folder where you find project.json):

```
user-secret set Authentication:Google:ClientId <yourId>
user-secret set Authentication:Google:ClientSecret <yourSecret>
```

In the `%APPDATA%\microsoft\UserSecrets` folder there is going to be a folder for your project and then a secrets.json inside.

<a href="https://brunolm.files.wordpress.com/2016/02/secrets1.png" rel="attachment wp-att-565"><img class="alignnone size-full wp-image-565" src="https://brunolm.files.wordpress.com/2016/02/secrets1.png" alt="secrets" width="700" height="177" /></a>

Then finally using it on your application, install Google Authentication:

```
Install-Package Microsoft.AspNet.Authentication.Google -Pre
```

Note the `-Pre` option, as of the date of this post this package will not be found if you do not include this option.

```csharp
app.UseGoogleAuthentication(options=>
{
    options.ClientId = Configuration["Authentication:Google:ClientId"];
    options.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
});
```

