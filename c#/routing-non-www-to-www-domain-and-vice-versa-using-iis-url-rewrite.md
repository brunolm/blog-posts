---
title: Routing non-www to www domain and vice versa using IIS URL Rewrite
tags: [domain, iis, url-rewrite]
---

If you have a domain and you want to refer to it in a single way, either with or without <code>www</code> you can use <a href="http://www.iis.net/downloads/microsoft/url-rewrite" target="_blank">IIS URL Rewrite</a> to redirect requests.

IIS URL Rewrite is a module that supports configurations from your <code>web.config</code> file to manipulate URLs. With it you can easily redirect from a non-www domain to a www domain.

You might think that <code>yourwebsite.com</code> looks shorter and cleaner, and I would agree of course, however if you want to aim to a high performance website you will have to reconsider.
<!--more-->

When you use a <code>non-www</code> domain you are putting cookies on the all catching domain. It means that for each static image on your website you would also be serving a huge session cookie along with it. The good side of using <code>www</code> is that you can isolate cookies in this subdomain and have a separated subdomain (cookie free and heavily cached) to serve static content.

[code]
www.yourdomain.com
static.yourdomain.com
[/code]

Jeff Atwood (Stack Overflow co-founder) <a href="http://blog.codinghorror.com/the-great-dub-dub-dub-debate/" target="_blank">once posted</a>:
<blockquote>WARNING: If you pick the domain example.com, be aware that all cookies you store on that domain will be sent to all subdomains … forever. This is a major downside I didn't discover until years later, and it's big enough to make me regret choosing stackoverflow.com versus www.stackoverflow.com.</blockquote>

Stack Exchange overcame this issue by creating a dedicated domain to serve static content only.

Enough with talk lets get to the code. Once you have the module installed you can just add on your <code>web.config</code> under <code>system.webServer</code> tag the following:

<strong>Converting non-www to www</strong> *make sure to update domain suffix
[code language="xml"]
<rewrite>
  <rules>
    <rule name="Canonical" stopProcessing="true">
      <match url=".*" />
      <conditions>
        <add input="{HTTP_HOST}" pattern="^([a-z]+[.]com)$" />
      </conditions>
      <action type="Redirect" url="http://www.{C:0}/{R:0}"
          redirectType="Permanent" />
    </rule>
  </rules>
</rewrite>
[/code]

<strong>Converting www to non-www</strong>
[code language="xml"]
<rewrite>
  <rules>
    <rule name="Canonical" stopProcessing="true">
      <match url=".*" />
      <conditions>
        <add input="{HTTP_HOST}" pattern="^www[.](.+)" />
      </conditions>
      <action type="Redirect" url="http://{C:1}/{R:0}"
          redirectType="Permanent" />
    </rule>
  </rules>
</rewrite>
[/code]
