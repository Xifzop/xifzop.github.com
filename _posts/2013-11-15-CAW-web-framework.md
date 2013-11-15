---
layout: post
title: 关于自己搭建的web框架CAW
---


{{page.title}}
***
***10:11 下午 星期四, 十一月 14, 2013***

>前言:

>最近由于项目需要，自己通过Ruby实现了了一个MVC框架。

>这是一个简易的web开发框架（暂时不敢自居为[MVC]），暂时命名为 "[CAW]"，这里是[项目主页]。为了在将来可能的复用或者扩展时，可以更好地让使用者（包括我自己），理解该项目的一个总体结构，这里写一篇简单的文档介绍一下。

言归正传。由于之前使用过几个[MVC]的框架，所以对于MVC框架有一个挥之不去的概念在。[MVC]是对于现有的web快速开发框架而言是较为普遍的一种架构选择，最早来源于Xerox PARC的Trygve Reenskaug在设计Smalltalk时采用的设计模式。由于其利于对程序进行后续的修改以及扩展简化，提高了可扩展性以及复用性，因为为后来的软件开发者们所追捧，所津津乐道。

在不同的语言中实现的[MVC]框架数不胜数，如J2EE, .NET, Django, TurboGears, Ruby on Rails, Zend Framework, Yii Framework, CodeIgniter等等，（相对而言，我接触较多的是后面几样的轻量级的框架）数不胜数。关于[MVC]，Wiki或许说的更细致一些。

虽然总有人说在采用的[MVC]模式web框架中，真正达到[MVC]本意的框架几乎没有，对这些讨论感兴趣的可以自行Google，或者这里有篇[MVC is a lie...]。MVC中将一个系统划分为Model，View以及Controller三个模块，这也是搭建[CAW]的一个思路。当然，搭建[CAW]主要的目的还是为了一切从简。

一般而言，web框架总是需要一个web服务器进行依托，然后框架本身作为web服务器的hooked Client-Request Processor而存在的，对于[CAW]而言也是这样的。候选的服务器有不少，但是考虑到与Ruby的集成，自然Ruby下的服务器就要优先考虑了。比如[Mongrel], [Unicorn], [WEBrick]等等，琳琅满目（这也是Ruby社区壮大起来的一个表征）。但是由于个人推崇的是Readability,所以[Sinatra]这个项目（已经算不上是纯碎的Server了）吸引了我，原因除了在其github上就很清楚了，有兴趣可以接触一下：

>Sinatra is a [DSL] for quickly creating web applications in Ruby with minimal effort

同时支持多套模板以及自定义模板的使用，更关键的是其包含Ruby下的较稳定高效的[Thin]服务器，[Thin]服务器将Mongrel Parser，Rack以及Event Machine粘合起来。（相当于同时承担了一部分服务器地址解析等的职责）

嗯至此，Sinatra简易服务器就作为[CAW]的重要基石。在Sinatra承担了Web服务器以及地址解析等核心功能之后。现在开始来考虑[MVC]。

***
我们先来看看一个CAW app的目录结构：
-------------------------------------------
+ /
	+ controller(dir)
		+ 该部分主要与sinatra进行交互. 在完成连接数据库，载入model中的dao类，以及提供provider帮助类完成变量池的初始化之后，利用controller，通过在controller中利用sinatra进行url与相应渲染页面映射的注册，完成最终的工作
	+ model(dir)
		+ dao(dir)
			+ 一堆dao对象，关于dao对象的定义，此处借鉴了Ruby on Rails中著名的ActiveRecord库进行辅助
		+ db.log
			+ 数据库访问日志
		+ db_conn.rb
			+ 进行数据库访问封装的
		+ init.rb
			+ 负责装载dao的类文件，使得接下来服务器的处理程序可以获得与数据库交互的dao对象
		+ provider.rb
			+ 在init完成对于dao对象的装载之后，Provider做的是真正与逻辑有关系的部分。Provider之所以称之为provider，是由于，在这个框架中，最终的view要完成页面数据的填充以及最终的渲染（说到这里突然想到以前看到过关于编译级模板渲染与脚本代码调用模板渲染的性能比较的一篇博文）。在页面views中可能用到的变量或者复杂业务逻辑的计算都在这里完成。模块provider提供一个变量池对象，其是一个hash（key一般为所选页面的symbol，例如对于index页面，:index => lambda{...}就作为一组分组值，而值为一个函数，该函数在需要渲染该页面时被调用，并且完成计算，所有的这些都是在controller中完成的），这个hash通过将不同views可能需要的变量进行分组，为页面中的数据引用进行数据准备，只在最终的view当中保留相当精简的逻辑需要。在最终的模板views中，如需调用，只需在该页面的模板代码中使用变量@\_[<变量名>]即可完成调用。
	+ views(dir)
		+ View文件...页面模板。默认采用ruby的模板语言erb完成模板渲染。
	+ config.yml
		+ 配置数据库以及项目下不同module路径, 由config_loader进行读取
	+ route\_map.yml
		+ 配置client request的请求路由表，由config_loader进行读取

***
####Model
***
####View
***
####Controller
***

###简单使用：（CAW from Scratch）
首先需要的预备知识有，erb的基本语法，还有RoR的ActiveRecord的使用经验，以及yaml的基本知识。

默认的gem需要sinatra以及mysql的库，别的库请按需添加。

	
1. 在数据库中建好表，在model/dao下添加相应的active record类，并且完成类的一些验证性的配置。详见[ActiveRecord]文档。
2. 在route\_map中配置，当客户端发送请求时，controller需要如何分配对应变量池给对应的页面。例如在route\_map.yml中：

> /index: index

则意味着，当客户端的浏览器中键入<app>/index的时候，controller将会分配给Provider变量池提供的homevar变量池以及相应的homevar页面进行处理。index.erb页面将会使用Provider::VAR_POOL的:index处理函数生成的变量填充页面。

3. 在model的provider中，建立相应的key-value，如上例，则新建:index，并且建立一个匿名函数定义所需处理业务的逻辑，并且将变量都放置到最后的vars中，记得vars一定要放在最后。我们在这里定义了一个s=2的变量，在最后的vars中对应的是result的值。

4. 完成第三步的定义后，我们开始在views下面建立erb页面，erb所需知识请参考[erb的doc].在erb页面中不需要什么复杂的计算，只要引用需要的变量以及进行逻辑判断就可以了。例如引用result的值，并且在页面上显示，需要：

> <%=@_[:result]%\>

完成之后，可以在caw项目的根目录下运行命令：

> ruby engine.rb launch


这次的Ruby实现的MVC一方面是出于动手的习惯，另一方面也是由于尽管Ruby on Rails提供了较为完备的功能集，却使得其较为笨重，（好吧关于这些可以去搜一搜关于Ruby社区内去rails化的一些讨论，尽管对于开发中小型的项目）也不利于有的快速项目开发者速成，其他方面原因没有想到太多。


[项目主页]: https://github.com/Xifzop/CAW "CAW的主页"
[CAW]: https://github.com/Xifzop/CAW "CAW的主页"
[MVC]: http://zh.wikipedia.org/wiki/MVC "关于MVC"
[MVC is a lie...]: http://activedeveloper.info/mvc-is-a-lie.html "MVC-is-a-lie"
[Mongrel]: https://github.com/mongrel/mongrel "Mongrel"
[Unicorn]: https://github.com/blog/517-unicorn "Unicorn"
[WEBrick]: http://www.ruby-doc.org/stdlib-2.0/libdoc/webrick/rdoc/WEBrick.html "WEBrick"
[Sinatra]: http://www.sinatrarb.com "Sinatra"
[Thin]: https://github.com/macournoyer/thin/ "Thin server"
[DSL]: http://en.wikipedia.org/wiki/Domain-specific_language "领域专用语言"
[ActiveRecord]: http://www.foo.com "ActiveRecord"
[erb的doc]: http://www.foo.com "ERB"