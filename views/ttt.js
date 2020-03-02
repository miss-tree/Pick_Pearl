&lt;div&gt; {{name|componentFilter}} &lt;/div&gt;
&lt;div :data="ok|componentFilter"&gt; hello world &lt;/div&gt;,

也可以是多个
		{{message|filterA|filterB}}
当变量		message:2019,filterA:"年",filterB="hello",
=&gt;渲染出来  		2019年hello
