# Serverless Pre-Rendering Demo

![Screenshot](https://assets.zeit.co/image/upload/v1556881767/front/blog/serverless-prerendering/screenshot.png)

<div align="center">
<a href="https://zeit.co/blog/serverless-pre-rendering">Read the blog post</a>
<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
<a href="https://notion-landing-page.jcblw.now.sh/">Checkout the demo</a>
</div>

## Developing

Once you have [Now CLI installed](https://zeit.co/download), you can run `now dev` to set up the code locally.

```bash
npm i -g now
now dev
```

By default, the content on the site is based off our [public Notion page](https://www.notion.so/Falling-in-love-with-the-things-I-have-instead-of-the-things-I-don-t-639148f049aa4d1ba233cf5a7d4e5986).

To edit and create content through your own Notion page, [sign up for Notion](https://www.notion.so/signup), and update the [`PAGE_ID`](https://github.com/jcblw/notion-landing-page/blob/master/data/notion.js#L3) on [`data/notion.js`](https://github.com/jcblw/notion-landing-page/blob/master/data/notion.js) with the Page ID of your page.

## Deploying

Deploying is one command:

```bash
now
```

### Integrate with GitHub and GitLab

We recommend setting up the [Now for GitHub](https://zeit.co/github) or [Now for GitLab](https://zeit.co/github) integration.

This allows you to simply push your code to deploy.

## About

Our mission at ZEIT is to make the cloud accessible to everyone. We do that by creating products that improve developer experience, provisioning infrastructure that is globally available, and by teaching the developer community about serverless-related technology.

Follow us on [Twitter](https://twitter.com/zeithq).
