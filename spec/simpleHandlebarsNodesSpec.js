var parser = require('../index');

describe('Handlebars nodes', function ()
{
	describe ('blocks statements', function ()
	{
		describe('if block', function ()
		{
			it('Should recognize a simple Handlebars if block', function ()
			{
				var result = parser.parse('{{#if condition}} {{/if}}')
				,	expeted = [{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},"ifBody":[],"elseBody":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body', function ()
			{
				var result = parser.parse('{{#if condition}} <div></div> {{/if}}')
				,	expeted = [{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"ifBody":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}],
								"elseBody":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body and else', function ()
			{
				var result = parser.parse('{{#if condition}} <div></div> {{else}} {{/if}}')
				,	expeted = [{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"ifBody":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}],
								"elseBody":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with only else', function ()
			{
				var result = parser.parse('{{#if condition}}  {{else}} <address></address> {{/if}}')
				,	expeted = [{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"ifBody":[],
								"elseBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body and else body', function ()
			{
				var result = parser.parse('{{#if condition}} <div></div> {{else}} <div></div> {{/if}}')
				,	expeted = [{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"ifBody":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}],
								"elseBody":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body and else body (single node)', function ()
			{
				var result = parser.parse('{{#if condition}} <div></div> {{else}} <input/> {{/if}}')
				,	expeted = [{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"ifBody":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}],
								"elseBody":[{"type":"htmlSingleNode","tag":"input","attributes":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body and else body (two elements)', function ()
			{
				var result = parser.parse('{{#if condition}} <div></div> {{else}} <input/><div></div> {{/if}}')
				,	expeted = [{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"ifBody":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}],
								"elseBody":[{"type":"htmlSingleNode","tag":"input","attributes":[]},{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body (two elements) and else body (single node)', function ()
			{
				var result = parser.parse('{{#if condition}} <div></div><hr/> {{else}} <input/> {{/if}}')
				,	expeted = [{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"ifBody":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]},{"type":"htmlSingleNode","tag":"hr","attributes":[]}],
								"elseBody":[{"type":"htmlSingleNode","tag":"input","attributes":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body (with two elements)', function ()
			{
				var result = parser.parse('{{#if iterator}} <address   > </address> <span></span>	 {{/if}}')
				,	expeted = [{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"iterator"},
								"ifBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]},
									{"type":"htmlBlockNode","openTag":"span","closeTag":"span","attributes":[],"children":[]}],
								"elseBody":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('each block', function ()
		{
			it('Should recognize a simple Handlebars each block', function ()
			{
				var result = parser.parse('{{#each iterator}} {{/each}}')
				,	expeted = [{"type":"handlebars","subType":"EACH","iterator":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"iterator"},"eachBody":[],"elseBody":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body', function ()
			{
				var result = parser.parse('{{#each iterator}} <address></address> {{/each}}')
				,	expeted = [{"type":"handlebars","subType":"EACH","iterator":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"iterator"},
								"eachBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
								"elseBody":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body and else', function ()
			{
				var result = parser.parse('{{#each iterator}} <address></address> {{else}} {{/each}}')
				,	expeted = [{"type":"handlebars","subType":"EACH","iterator":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"iterator"},
									"eachBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
									"elseBody":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with only else', function ()
			{
				var result = parser.parse('{{#each condition}}  {{else}} <address></address> {{/each}}')
				,	expeted = [{"type":"handlebars","subType":"EACH","iterator":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"eachBody":[],
								"elseBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body and else body', function ()
			{
				var result = parser.parse('{{#each iterator}} <address></address> {{else}} <div></div> {{/each}}')
				,	expeted = [{"type":"handlebars","subType":"EACH","iterator":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"iterator"},
									"eachBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
									"elseBody":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body and else body (single node)', function ()
			{
				var result = parser.parse('{{#each iterator}} <address></address> {{else}} <hr/> {{/each}}')
				,	expeted = [{"type":"handlebars","subType":"EACH","iterator":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"iterator"},
							"eachBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
							"elseBody":[{"type":"htmlSingleNode","tag":"hr","attributes":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body and else body (two node)', function ()
			{
				var result = parser.parse('{{#each iterator}} <address></address> {{else}} <hr/><span></span> {{/each}}')
				,	expeted = [{"type":"handlebars","subType":"EACH","iterator":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"iterator"},
								"eachBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
								"elseBody":[{"type":"htmlSingleNode","tag":"hr","attributes":[]},
									{"type":"htmlBlockNode","openTag":"span","closeTag":"span","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body (two elements) and else body (single node)', function ()
			{
				var result = parser.parse('{{#each iterator}} <address></address><div></div> {{else}} <hr/> {{/each}}')
				,	expeted = [{"type":"handlebars","subType":"EACH","iterator":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"iterator"},
								"eachBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]},
									{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}],
								"elseBody":[{"type":"htmlSingleNode","tag":"hr","attributes":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body (with two elements)', function ()
			{
				var result = parser.parse('{{#each iterator}} <address   > </address> <span></span>	 {{/each}}')
				,	expeted = [{"type":"handlebars","subType":"EACH","iterator":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"iterator"},
								"eachBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]},
										{"type":"htmlBlockNode","openTag":"span","closeTag":"span","attributes":[],"children":[]}],
								"elseBody":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('unless block', function ()
		{
			it('Should recognize a simple Handlebars unless block', function ()
			{
				var result = parser.parse('{{#unless condition}} {{/unless}}')
				,	expeted = [{"type":"handlebars","subType":"UNLESS","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},"unlessBody":[],"elseBody":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body', function ()
			{
				var result = parser.parse('{{#unless condition}} <address></address> {{/unless}}')
				,	expeted = [{"type":"handlebars","subType":"UNLESS","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"unlessBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
								"elseBody":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body and else', function ()
			{
				var result = parser.parse('{{#unless condition}} <address></address> {{else}} {{/unless}}')
				,	expeted = [{"type":"handlebars","subType":"UNLESS","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"unlessBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
								"elseBody":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with only else', function ()
			{
				var result = parser.parse('{{#unless condition}}  {{else}} <address></address> {{/unless}}')
				,	expeted = [{"type":"handlebars","subType":"UNLESS","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"unlessBody":[],
								"elseBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body and else body', function ()
			{
				var result = parser.parse('{{#unless condition}} <address></address> {{else}} <div></div> {{/unless}}')
				,	expeted = [{"type":"handlebars","subType":"UNLESS","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"unlessBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
								"elseBody":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body and else body (single node)', function ()
			{
				var result = parser.parse('{{#unless condition}} <address></address> {{else}} <hr/> {{/unless}}')
				,	expeted = [{"type":"handlebars","subType":"UNLESS","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"unlessBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
								"elseBody":[{"type":"htmlSingleNode","tag":"hr","attributes":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body and else body (two node)', function ()
			{
				var result = parser.parse('{{#unless condition}} <address></address> {{else}} <hr/><span></span> {{/unless}}')
				,	expeted = [{"type":"handlebars","subType":"UNLESS","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"unlessBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}],
								"elseBody":[{"type":"htmlSingleNode","tag":"hr","attributes":[]},
									{"type":"htmlBlockNode","openTag":"span","closeTag":"span","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body (two elements) and else body (single node)', function ()
			{
				var result = parser.parse('{{#unless condition}} <address></address><div></div> {{else}} <hr/> {{/unless}}')
				,	expeted = [{"type":"handlebars","subType":"UNLESS","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"unlessBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]},
									{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}],
								"elseBody":[{"type":"htmlSingleNode","tag":"hr","attributes":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body (with two elements)', function ()
			{
				var result = parser.parse('{{#unless condition}} <address   > </address> <span></span>	 {{/unless}}')
				,	expeted = [{"type":"handlebars","subType":"UNLESS","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"condition"},
								"unlessBody":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]},
									{"type":"htmlBlockNode","openTag":"span","closeTag":"span","attributes":[],"children":[]}],
								"elseBody":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('generic block', function ()
		{
			it('Should recognize a simple generic Handlebars block', function ()
			{
				var result = parser.parse('{{#generic}} {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic","parameters":[],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body', function ()
			{
				var result = parser.parse('{{#generic }} <address></address> {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic","parameters":[],
								"children":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and (two elements)', function ()
			{
				var result = parser.parse('{{#generic }} <address></address><input/> {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic","parameters":[],
								"children":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]},
									{"type":"htmlSingleNode","tag":"input","attributes":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a simple parameter', function ()
			{
				var result = parser.parse('{{#generic param1}} <address></address> {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic",
								"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"}],
								"children":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and simple parameters', function ()
			{
				var result = parser.parse('{{#generic param1 param2}} <address></address> {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic",
								"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"},
									{"type":"parameter","subType":"SINGLEEVALUATION","value":"param2"}],
								"children":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a string parameter', function ()
			{
				var result = parser.parse('{{#generic "param1" }} <address></address> {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic",
								"parameters":[{"type":"parameter","subType":"SIMPLEVALUE","value":"\"param1\""}],
								"children":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a number parameter', function ()
			{
				var result = parser.parse('{{#generic 1 }} <address></address>  {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic",
								"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"1"}],
								"children":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a reference parameter', function ()
			{
				var result = parser.parse('{{#generic @index }} <address></address>  {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic",
								"parameters":[{"type":"parameter","subType":"REFERENCEEVALUATION","value":"@index"}],
								"children":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a lookup parameter', function ()
			{
				var result = parser.parse('{{#generic ../../grandParent }} <address></address>  {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic",
								"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]}],
								"children":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and multi parameters', function ()
			{
				var result = parser.parse('{{#generic ../../grandParent 123 "string" simpleEval }} <address></address>  {{/generic}}')
				,	expeted = [{"type":"handlebars","subType":"GENERICBLOCK","openTag":"generic","closeTag":"generic",
								"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]},
									{"type":"parameter","subType":"SINGLEEVALUATION","value":"123"},
									{"type":"parameter","subType":"SIMPLEVALUE","value":"\"string\""},
									{"type":"parameter","subType":"SINGLEEVALUATION","value":"simpleEval"}],
								"children":[{"type":"htmlBlockNode","openTag":"address","closeTag":"address","attributes":[],"children":[]}]}];

				expect(result).toEqual(expeted);
			});
		});
	});

	describe('single statements', function ()
	{
		describe('Safe evaluation', function ()
		{
			it('Should recognize a simple safe evaluation', function ()
			{
				var result = parser.parse('{{evaluateMe}}')
				,	expeted = [{"type":"handlebars","subType":"SAFEEVALUATION","value":"evaluateMe"}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple safe evaluation with spaces', function ()
			{
				var result = parser.parse('{{ evaluateMe  }}')
				,	expeted = [{"type":"handlebars","subType":"SAFEEVALUATION","value":"evaluateMe"}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple safe evaluation with dots', function ()
			{
				var result = parser.parse('{{evaluate.Me.again}}')
				,	expeted = [{"type":"handlebars","subType":"SAFEEVALUATION","value":"evaluate.Me.again"}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Safe reference evaluation', function ()
		{
			it('Should recognize a simple reference evaluation', function ()
			{
				var result = parser.parse('{{@index}}')
				,	expeted = [{"type":"handlebars","subType":"SAFEREFERENCEEVALUATION","value":"@index"}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple reference evaluation with spaces', function ()
			{
				var result = parser.parse('{{ @index  }}')
				,	expeted = [{"type":"handlebars","subType":"SAFEREFERENCEEVALUATION","value":"@index"}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple reference evaluation with dots', function ()
			{
				var result = parser.parse('{{@evaluate.Me.again}}')
				,	expeted = [{"type":"handlebars","subType":"SAFEREFERENCEEVALUATION","value":"@evaluate.Me.again"}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Unsafe evaluation', function ()
		{
			it('Should recognize a simple unsafe evaluation', function ()
			{
				var result = parser.parse('{{{evaluateMe}}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEEVALUATION","value":"evaluateMe"}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple unsafe evaluation with spaces', function ()
			{
				var result = parser.parse('{{{ evaluateMe  }}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEEVALUATION","value":"evaluateMe"}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple unsafe evaluation with dots', function ()
			{
				var result = parser.parse('{{{evaluate.Me.again}}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEEVALUATION","value":"evaluate.Me.again"}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Unsafe reference evaluation', function ()
		{
			it('Should recognize a simple unsafe reference evaluation', function ()
			{
				var result = parser.parse('{{{@index}}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEREFERENCEEVALUATION","value":"@index"}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple unsafe reference evaluation with spaces', function ()
			{
				var result = parser.parse('{{{ @index  }}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEREFERENCEEVALUATION","value":"@index"}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple unsafe reference evaluation with dots', function ()
			{
				var result = parser.parse('{{{@evaluate.Me.again}}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEREFERENCEEVALUATION","value":"@evaluate.Me.again"}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Look expression', function ()
		{
			it('Should recognize a simple look up expression', function ()
			{
				var result = parser.parse('{{../parent}}')
				,	expeted = [{"type":"handlebars","subType":"LOOKUPSINGLE","value":["..","parent"]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple look up expression with spaces', function ()
			{
				var result = parser.parse('{{ ../parent  }}')
				,	expeted = [{"type":"handlebars","subType":"LOOKUPSINGLE","value":["..","parent"]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a look up expression of many levels', function ()
			{
				var result = parser.parse('{{../../../parent}}')
				,	expeted = [{"type":"handlebars","subType":"LOOKUPSINGLE","value":["..","..","..","parent"]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a look up expression of many levels with spaces', function ()
			{
				var result = parser.parse('{{  ../../../parent  }}')
				,	expeted = [{"type":"handlebars","subType":"LOOKUPSINGLE","value":["..","..","..","parent"]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Comments', function ()
		{
			it('Should recognize a simple handlebars comment', function ()
			{
				var result = parser.parse('{{!-- Simple Comments 01 --}}')
				,	expeted = [{"type":"handlebars","subType":"SINGLECOMMENTS","value":" Simple Comments 01 "}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a handlebars comment with enters and spaces', function ()
			{
				var result = parser.parse('{{!-- Simple \n \t Comments    --}}')
				,	expeted = [{"type":"handlebars","subType":"SINGLECOMMENTS","value":" Simple \n \t Comments    "}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Safe Generic expressions', function ()
		{
			it('Should recognize a simple generic Handlebars statement with a simple parameter', function ()
			{
				var result = parser.parse('{{generic param1 }}')
				,	expeted = [{"type":"handlebars","subType":"GENERICSINGLE","value":"generic","parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with two simple parameters', function ()
			{
				var result = parser.parse('{{generic param1 param2 }}')
				,	expeted = [{"type":"handlebars","subType":"GENERICSINGLE","value":"generic","parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"},
								{"type":"parameter","subType":"SINGLEEVALUATION","value":"param2"}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a string parameter', function ()
			{
				var result = parser.parse('{{generic "param1"  }}')
				,	expeted = [{"type":"handlebars","subType":"GENERICSINGLE","value":"generic","parameters":[{"type":"parameter","subType":"SIMPLEVALUE","value":"\"param1\""}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a number parameter', function ()
			{
				var result = parser.parse('{{generic 1 }}')
				,	expeted = [{"type":"handlebars","subType":"GENERICSINGLE","value":"generic","parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"1"}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a reference parameter', function ()
			{
				var result = parser.parse('{{generic @index }}')
				,	expeted = [{"type":"handlebars","subType":"GENERICSINGLE","value":"generic","parameters":[{"type":"parameter","subType":"REFERENCEEVALUATION","value":"@index"}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a lookup parameter', function ()
			{
				var result = parser.parse('{{generic ../../grandParent }}')
				,	expeted = [{"type":"handlebars","subType":"GENERICSINGLE","value":"generic","parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with multi parameters', function ()
			{
				var result = parser.parse('{{generic ../../grandParent 123 "string" simpleEval }}')
				,	expeted = [{"type":"handlebars","subType":"GENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"123"},
										{"type":"parameter","subType":"SIMPLEVALUE","value":"\"string\""},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"simpleEval"}]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('UnSafe Generic expressions', function ()
		{
			it('Should recognize a simple generic Handlebars statement with a simple parameter', function ()
			{
				var result = parser.parse('{{{generic param1 }}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEGENERICSINGLE","value":"generic",
								"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with two simple parameters', function ()
			{
				var result = parser.parse('{{{generic param1 param2 }}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEGENERICSINGLE","value":"generic",
								"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"},{"type":"parameter","subType":"SINGLEEVALUATION","value":"param2"}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a string parameter', function ()
			{
				var result = parser.parse('{{{generic "param1"  }}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEGENERICSINGLE","value":"generic",
								"parameters":[{"type":"parameter","subType":"SIMPLEVALUE","value":"\"param1\""}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a number parameter', function ()
			{
				var result = parser.parse('{{{generic 1 }}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEGENERICSINGLE","value":"generic",
								"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"1"}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a reference parameter', function ()
			{
				var result = parser.parse('{{{generic @index }}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEGENERICSINGLE","value":"generic",
								"parameters":[{"type":"parameter","subType":"REFERENCEEVALUATION","value":"@index"}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a lookup parameter', function ()
			{
				var result = parser.parse('{{{generic ../../grandParent }}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEGENERICSINGLE","value":"generic",
								"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with multi parameters', function ()
			{
				var result = parser.parse('{{{generic ../../grandParent 123 "string" simpleEval }}}')
				,	expeted = [{"type":"handlebars","subType":"UNSAFEGENERICSINGLE","value":"generic",
								"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]},
									{"type":"parameter","subType":"SINGLEEVALUATION","value":"123"},
									{"type":"parameter","subType":"SIMPLEVALUE","value":"\"string\""},
									{"type":"parameter","subType":"SINGLEEVALUATION","value":"simpleEval"}]}];

				expect(result).toEqual(expeted);
			});
		});
	});
});