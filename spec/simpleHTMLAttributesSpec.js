var parser = require('../index');

describe('Simple HTML Attributes', function ()
{
	describe('key value nodes', function ()
	{
		it('Should recognize key-value with one value using double quotes', function ()
		{
			var result = parser.parse('<div data-type="controller"></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"keyValue","key":"data-type",
								"value":[{"type":"singleValue","value":"controller"}]}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize key-value with none value using double quotes', function ()
		{
			var result = parser.parse('<div data-type=""></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"keyValue","key":"data-type","value":[{"type":"singleValue","value":""}]}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize key-value with two value using double quotes', function ()
		{
			var result = parser.parse('<div class="blue red"></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"keyValue","key":"class",
								"value":[{"type":"singleValue","value":"blue"},
									{"type":"singleKey","subType":"extraSpaces","value":" "},
									{"type":"singleValue","value":"red"}]}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize key-value with one value using single quotes', function ()
		{
			var result = parser.parse('<div data-type=\'controller\'></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"keyValue","key":"data-type","value":[{"type":"singleValue","value":"controller"}]}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize key-value with none value using single quotes', function ()
		{
			var result = parser.parse('<div data-type=\'\'></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"keyValue","key":"data-type","value":[{"type":"singleValue","value":""}]}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize key-value with two value using single quotes', function ()
		{
			var result = parser.parse('<div class=\'blue red\'></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"keyValue","key":"class",
								"value":[{"type":"singleValue","value":"blue"},
									{"type":"singleKey","subType":"extraSpaces","value":" "},
									{"type":"singleValue","value":"red"}]}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});
	});

	describe('single keys nodes', function ()
	{
		it('Should recognize single key', function ()
		{
			var result = parser.parse('<div checked ></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"singleKey","value":"checked"}],"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize two single keys', function ()
		{
			var result = parser.parse('<div checked disabled ></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"singleKey","value":"checked"},
								{"type":"singleKey","subType":"extraSpaces","value":" "},
								{"type":"singleKey","value":"disabled"}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize two single keys (one with single quotes)', function ()
		{
			var result = parser.parse('<div checked \'disabled\' ></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"singleKey","value":"checked"},
								{"type":"singleKey","subType":"extraSpaces","value":" "},
								{"type":"singleKey","value":"disabled"}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize two single keys (one with double quotes)', function ()
		{
			var result = parser.parse('<div checked "disabled" ></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"singleKey","value":"checked"},
								{"type":"singleKey","subType":"extraSpaces","value":" "},
								{"type":"singleKey","value":"disabled"}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize two single keys (one with double quotes and the other with single quotes)', function ()
		{
			var result = parser.parse('<div \'checked\' "disabled" ></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"singleKey","value":"checked"},
								{"type":"singleKey","subType":"extraSpaces","value":" "},
								{"type":"singleKey","value":"disabled"}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize single keys nodes mixed', function ()
		{
			var result = parser.parse('<div \'checked\' ok-value testing "disabled" ></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div",
							"attributes":[{"type":"singleKey","value":"checked"},
								{"type":"singleKey","subType":"extraSpaces","value":" "},
								{"type":"singleKey","value":"ok-value"},
								{"type":"singleKey","subType":"extraSpaces","value":" "},
								{"type":"singleKey","value":"testing"},
								{"type":"singleKey","subType":"extraSpaces","value":" "},
								{"type":"singleKey","value":"disabled"}],
							"children":[]}];

			expect(result).toEqual(expeted);
		});

	});
});