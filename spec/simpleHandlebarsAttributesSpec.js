var parser = require('../index');

describe('Simple Handlebars Attributes', function ()
{
	describe ('blocks statements', function ()
	{
		describe('if block', function ()
		{
			it('Should recognize a simple Handlebars if block', function ()
			{
				var result = parser.parse('<div {{#if condition}} {{/if}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRIF",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"ifBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]}],
									"elseBody":[]}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body', function ()
			{
				var result = parser.parse('<div {{#if condition}} checked {{/if}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRIF",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"ifBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"checked"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[]}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body and else', function ()
			{
				var result = parser.parse('<div {{#if condition}} checked {{else}} {{/if}} ></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRIF",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"ifBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"checked"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]}]}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with only else', function ()
			{
				var result = parser.parse('<span {{#if condition}}  {{else}} \'selected\' {{/if}}></span>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span",
								"attributes":[{"type":"handlebars","subType":"ATTRIF",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"ifBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "," "]}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"selected"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body and else body', function ()
			{
				var result = parser.parse('<article {{#if condition}} data="red" {{else}} blue {{/if}}> </article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTRIF",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"ifBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"data","value":[{"type":"singleValue","value":"red"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"blue"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body and else body (key values both)', function ()
			{
				var result = parser.parse('<article {{#if condition}} class="highlight" {{else}} name="Mictian" {{/if}}> </article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTRIF",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"ifBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"highlight"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"Mictian"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body and else body (two elements)', function ()
			{
				var result = parser.parse('<input {{#if condition}} selected {{else}} class="red" name="block" {{/if}} />')
				,	expeted = [{"type":"htmlSingleNode","tag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRIF",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"ifBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"selected"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"red"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"block"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body (two elements) and else body (one node)', function ()
			{
				var result = parser.parse('<div {{#if condition}} class="red" name="block" {{else}} uncehcked {{/if}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRIF",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"ifBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"red"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"block"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"uncehcked"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars if block with body (with two elements)', function ()
			{
				var result = parser.parse('<input {{#if condition}} type="text" class="brown"  {{/if}} >')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRIF",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"ifBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"type","value":[{"type":"singleValue","value":"text"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"brown"}]},
										{"type":"singleKey","subType":"extraSpaces","value":"  "}],
									"elseBody":[]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('each block', function ()
		{
			it('Should recognize a simple Handlebars each block', function ()
			{
				var result = parser.parse('<div {{#each iterator}} {{/each}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTREACH",
									"iterator":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
									"eachBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]}],
									"elseBody":[]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body', function ()
			{
				var result = parser.parse('<div {{#each iterator}} checked {{/each}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTREACH",
									"iterator":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
									"eachBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"checked"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body and else', function ()
			{
				var result = parser.parse('<div {{#each iterator}} checked {{else}} {{/each}} ></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTREACH",
									"iterator":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
									"eachBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"checked"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with only else', function ()
			{
				var result = parser.parse('<span {{#each iterator}}  {{else}} \'selected\' {{/each}}></span>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span",
								"attributes":[{"type":"handlebars","subType":"ATTREACH",
									"iterator":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
									"eachBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "," "]}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"selected"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body and else body', function ()
			{
				var result = parser.parse('<article {{#each iteration}} data="red" {{else}} blue {{/each}}> </article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTREACH",
									"iterator":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iteration"},
									"eachBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"data","value":[{"type":"singleValue","value":"red"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"blue"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body and else body (key values both)', function ()
			{
				var result = parser.parse('<article {{#each iterator}} class="highlight" {{else}} name="Mictian" {{/each}}> </article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTREACH",
									"iterator":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
									"eachBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"highlight"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"Mictian"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body and else body (two elements)', function ()
			{
				var result = parser.parse('<input {{#each array}} selected {{else}} class="red" name="block" {{/each}} />')
				,	expeted = [{"type":"htmlSingleNode","tag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTREACH",
									"iterator":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"array"},
									"eachBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"selected"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"red"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"block"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body (two elements) and else body (one node)', function ()
			{
				var result = parser.parse('<div {{#each people}} class="red" name="block" {{else}} uncehcked {{/each}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTREACH",
									"iterator":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"people"},
									"eachBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"red"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"block"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"uncehcked"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars each block with body (with two elements)', function ()
			{
				var result = parser.parse('<input {{#each condition}} type="text" class="brown"  {{/each}} >')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTREACH",
									"iterator":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"eachBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"type","value":[{"type":"singleValue","value":"text"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"brown"}]},
										{"type":"singleKey","subType":"extraSpaces","value":"  "}],
									"elseBody":[]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('unless block', function ()
		{
			it('Should recognize a simple Handlebars unless block', function ()
			{
				var result = parser.parse('<div {{#unless iterator}} {{/unless}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRUNLESS",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
									"unlessBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]}],
									"elseBody":[]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body', function ()
			{
				var result = parser.parse('<div {{#unless iterator}} checked {{/unless}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRUNLESS",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
									"unlessBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"checked"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body and else', function ()
			{
				var result = parser.parse('<div {{#unless iterator}} checked {{else}} {{/unless}} ></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
									"attributes":[{"type":"handlebars","subType":"ATTRUNLESS",
										"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
										"unlessBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
											{"type":"singleKey","value":"checked"},
											{"type":"singleKey","subType":"extraSpaces","value":" "}],
										"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]}]}],
									"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with only else', function ()
			{
				var result = parser.parse('<span {{#unless iterator}}  {{else}} \'selected\' {{/unless}}></span>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span",
								"attributes":[{"type":"handlebars","subType":"ATTRUNLESS",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
									"unlessBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "," "]}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"selected"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body and else body', function ()
			{
				var result = parser.parse('<article {{#unless iteration}} data="red" {{else}} blue {{/unless}}> </article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTRUNLESS",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iteration"},
									"unlessBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"data","value":[{"type":"singleValue","value":"red"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"blue"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body and else body (key values both)', function ()
			{
				var result = parser.parse('<article {{#unless iterator}} class="highlight" {{else}} name="Mictian" {{/unless}}> </article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTRUNLESS",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"iterator"},
									"unlessBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"highlight"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"Mictian"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body and else body (two elements)', function ()
			{
				var result = parser.parse('<input {{#unless array}} selected {{else}} class="red" name="block" {{/unless}} />')
				,	expeted = [{"type":"htmlSingleNode","tag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRUNLESS",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"array"},
									"unlessBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"selected"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"red"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"block"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body (two elements) and else body (one node)', function ()
			{
				var result = parser.parse('<div {{#unless people}} class="red" name="block" {{else}} uncehcked {{/unless}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRUNLESS",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"people"},
									"unlessBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"red"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"block"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "}],
									"elseBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"singleKey","value":"uncehcked"},
										{"type":"singleKey","subType":"extraSpaces","value":" "}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple Handlebars unless block with body (with two elements)', function ()
			{
				var result = parser.parse('<input {{#unless condition}} type="text" class="brown"  {{/unless}} >')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRUNLESS",
									"condition":{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"condition"},
									"unlessBody":[{"type":"singleKey","subType":"extraSpaces","value":[" "]},
										{"type":"keyValue","key":"type","value":[{"type":"singleValue","value":"text"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"brown"}]},
										{"type":"singleKey","subType":"extraSpaces","value":"  "}],
									"elseBody":[]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('generic block', function ()
		{
			it('Should recognize a simple generic Handlebars block', function ()
			{
				var result = parser.parse('<div {{#generic}} {{/generic}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK","value":[],"openTag":"generic","closeTag":"generic","parameters":""}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body', function ()
			{
				var result = parser.parse('<input {{#generic }} type="date" {{/generic}} />')
				,	expeted = [{"type":"htmlSingleNode","tag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK",
									"value":{"type":"keyValue","key":"type","value":[{"type":"singleValue","value":"date"}]},
									"openTag":"generic","closeTag":"generic","parameters":""}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and (two elements)', function ()
			{
				var result = parser.parse('<input {{#generic }} class="error" type="blue" {{/generic}} >')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK",
									"value":[{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"error"}]},
										{"type":"singleKey","subType":"extraSpaces","value":" "},
										{"type":"keyValue","key":"type","value":[{"type":"singleValue","value":"blue"}]}],
									"openTag":"generic","closeTag":"generic","parameters":""}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a simple parameter', function ()
			{
				var result = parser.parse('<article {{#generic param1}} disabled {{/generic}}></article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK",
									"value":{"type":"singleKey","value":"disabled"},"openTag":"generic","closeTag":"generic",
									"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and simple parameters', function ()
			{
				var result = parser.parse('<span {{#generic param1 param2}} enable {{/generic}}></span>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK",
									"value":{"type":"singleKey","value":"enable"},"openTag":"generic","closeTag":"generic",
									"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"param2"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a string parameter', function ()
			{
				var result = parser.parse('<div {{#generic "param1" }} type=\'HTML\' {{/generic}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK",
									"value":{"type":"keyValue","key":"type","value":[{"type":"singleValue","value":"HTML"}]},
									"openTag":"generic","closeTag":"generic",
									"parameters":[{"type":"parameter","subType":"SIMPLEVALUE","value":"\"param1\""}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a number parameter', function ()
			{
				var result = parser.parse('<div {{#generic 1 }} type="blueHTML"  {{/generic}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK",
									"value":{"type":"keyValue","key":"type","value":[{"type":"singleValue","value":"blueHTML"}]},
									"openTag":"generic","closeTag":"generic",
									"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"1"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a reference parameter', function ()
			{
				var result = parser.parse('<div {{#generic @index }} data-type="tranformer" {{/generic}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK",
									"value":{"type":"keyValue","key":"data-type","value":[{"type":"singleValue","value":"tranformer"}]},
									"openTag":"generic","closeTag":"generic",
									"parameters":[{"type":"parameter","subType":"REFERENCEEVALUATION","value":"@index"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and a lookup parameter', function ()
			{
				var result = parser.parse('<code {{#generic ../../grandParent }} style=""  {{/generic}}></code>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"code","closeTag":"code",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK",
									"value":{"type":"keyValue","key":"style","value":[{"type":"singleValue","value":""}]},
									"openTag":"generic","closeTag":"generic",
									"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with body and multi parameters', function ()
			{
				var result = parser.parse('<div {{#generic ../../grandParent 123 "string" simpleEval }} works  {{/generic}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICBLOCK",
									"value":{"type":"singleKey","value":"works"},
									"openTag":"generic","closeTag":"generic",
									"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"123"},
										{"type":"parameter","subType":"SIMPLEVALUE","value":"\"string\""},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"simpleEval"}]}],
								"children":[]}];

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
				var result = parser.parse('<div {{evaluateMe}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"evaluateMe"}],"children":[]}]

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple safe evaluation with spaces', function ()
			{
				var result = parser.parse('<article {{ evaluateMe  }}></article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"evaluateMe"}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple safe evaluation with dots', function ()
			{
				var result = parser.parse('<input {{evaluate.Me.again}} />')
				,	expeted = [{"type":"htmlSingleNode","tag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRSINGLEEVALUATION","value":"evaluate.Me.again"}]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Safe reference evaluation', function ()
		{
			it('Should recognize a simple reference evaluation', function ()
			{
				var result = parser.parse('<input {{@index}}>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRREFERENCEEVALUATION","value":"@index"}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple reference evaluation with spaces', function ()
			{
				var result = parser.parse('<span {{ @index  }}> </span>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span",
								"attributes":[{"type":"handlebars","subType":"ATTRREFERENCEEVALUATION","value":"@index"}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple reference evaluation with dots', function ()
			{
				var result = parser.parse('<div {{@evaluate.Me.again}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRREFERENCEEVALUATION","value":"@evaluate.Me.again"}],"children":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Unsafe evaluation', function ()
		{
			it('Should recognize a simple unsafe evaluation', function ()
			{
				var result = parser.parse('<div {{{evaluateMe}}}> </div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFESINGLEEVALUATION","value":"evaluateMe"}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple unsafe evaluation with spaces', function ()
			{
				var result = parser.parse('<input {{{ evaluateMe  }}} >')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFESINGLEEVALUATION","value":"evaluateMe"}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple unsafe evaluation with dots', function ()
			{
				var result = parser.parse('<input {{{evaluate.Me.again}}}/>')
				,	expeted = [{"type":"htmlSingleNode","tag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFESINGLEEVALUATION","value":"evaluate.Me.again"}]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Unsafe reference evaluation', function ()
		{
			it('Should recognize a simple unsafe reference evaluation', function ()
			{
				var result = parser.parse('<div {{{@index}}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFEREFERENCEEVALUATION","value":"@index"}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple unsafe reference evaluation with spaces', function ()
			{
				var result = parser.parse('<input {{{ @index  }}}/>')
				,	expeted = [{"type":"htmlSingleNode","tag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFEREFERENCEEVALUATION","value":"@index"}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple unsafe reference evaluation with dots', function ()
			{
				var result = parser.parse('<input {{{@evaluate.Me.again}}}>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFEREFERENCEEVALUATION","value":"@evaluate.Me.again"}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Look expression', function ()
		{
			it('Should recognize a simple look up expression', function ()
			{
				var result = parser.parse('<article{{../parent}} ></article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTRLOOKUPSINGLE","value":["..","parent"]}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple look up expression with spaces', function ()
			{
				var result = parser.parse('<span {{ ../parent  }}></span>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span",
								"attributes":[{"type":"handlebars","subType":"ATTRLOOKUPSINGLE","value":["..","parent"]}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a look up expression of many levels', function ()
			{
				var result = parser.parse('<span {{../../../parent}}></span>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span",
								"attributes":[{"type":"handlebars","subType":"ATTRLOOKUPSINGLE","value":["..","..","..","parent"]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a look up expression of many levels with spaces', function ()
			{
				var result = parser.parse('<div {{  ../../../parent  }}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRLOOKUPSINGLE","value":["..","..","..","parent"]}],"children":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Comments', function ()
		{
			it('Should recognize a simple handlebars comment', function ()
			{
				var result = parser.parse('<div {{!-- Simple Comments 01 --}} ></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRSINGLECOMMENTS","value":" Simple Comments 01 "}],"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a handlebars comment with enters and spaces', function ()
			{
				var result = parser.parse('<input {{!-- Simple \n \t Comments    --}}>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRSINGLECOMMENTS","value":" Simple \n \t Comments    "}],"children":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('Safe Generic expressions', function ()
		{
			it('Should recognize a simple generic Handlebars statement with a simple parameter', function ()
			{
				var result = parser.parse('<div {{generic param1 }}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with two simple parameters', function ()
			{
				var result = parser.parse('<input {{generic param1 param2 }}/>')
				,	expeted = [{"type":"htmlSingleNode","tag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"param2"}]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a string parameter', function ()
			{
				var result = parser.parse('<article{{generic "param1"  }}> </article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"SIMPLEVALUE","value":"\"param1\""}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a number parameter', function ()
			{
				var result = parser.parse('<div {{generic 1 }}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"1"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a reference parameter', function ()
			{
				var result = parser.parse('<input {{generic @index }}>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"REFERENCEEVALUATION","value":"@index"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a lookup parameter', function ()
			{
				var result = parser.parse('<div {{generic ../../grandParent }}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with multi parameters', function ()
			{
				var result = parser.parse('<div {{generic ../../grandParent 123 "string" simpleEval }}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"123"},
										{"type":"parameter","subType":"SIMPLEVALUE","value":"\"string\""},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"simpleEval"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});
		});

		describe('UnSafe Generic expressions', function ()
		{
			it('Should recognize a simple generic Handlebars statement with a simple parameter', function ()
			{
				var result = parser.parse('<div {{{generic param1 }}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFEGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with two simple parameters', function ()
			{
				var result = parser.parse('<input {{{generic param1 param2 }}}/>')
				,	expeted = [{"type":"htmlSingleNode","tag":"input","attributes":[{"type":"handlebars","subType":"ATTRUNSAFEGENERICSINGLE","value":"generic",
								"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"param1"},
									{"type":"parameter","subType":"SINGLEEVALUATION","value":"param2"}]}]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a string parameter', function ()
			{
				var result = parser.parse('<article{{{generic "param1"  }}}> </article>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"article","closeTag":"article",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFEGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"SIMPLEVALUE","value":"\"param1\""}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a number parameter', function ()
			{
				var result = parser.parse('<div {{{generic 1 }}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFEGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"SINGLEEVALUATION","value":"1"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a reference parameter', function ()
			{
				var result = parser.parse('<input {{{generic @index }}}>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"input","closeTag":"input",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFEGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"REFERENCEEVALUATION","value":"@index"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars statement with a lookup parameter', function ()
			{
				var result = parser.parse('<div {{{generic ../../grandParent }}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFEGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});

			it('Should recognize a simple generic Handlebars block with multi 3', function ()
			{
				var result = parser.parse('<div {{{generic ../../grandParent 123 "string" simpleEval }}}></div>')
				,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
								"attributes":[{"type":"handlebars","subType":"ATTRUNSAFEGENERICSINGLE","value":"generic",
									"parameters":[{"type":"parameter","subType":"LOOKUPSINGLE","value":["..","..","grandParent"]},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"123"},
										{"type":"parameter","subType":"SIMPLEVALUE","value":"\"string\""},
										{"type":"parameter","subType":"SINGLEEVALUATION","value":"simpleEval"}]}],
								"children":[]}];

				expect(result).toEqual(expeted);
			});
		});
	});
});