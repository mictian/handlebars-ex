var parser = require('../index');

describe('Simple HTLM', function ()
{
	describe('block nodes', function ()
	{
		it('Should recognize simple block elements (div)', function ()
		{
			var result = parser.parse('<div></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize simples block elements (div) together', function ()
		{
			var result = parser.parse('<div></div><div></div>')
			,	expeted = [	{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]},
							{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize simple block elements (span)', function ()
		{
			var result = parser.parse('<span></span>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span","attributes":[],"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize simple block elements omitting spaces', function ()
		{
			var result = parser.parse(' <div     >    </div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize nested simple block elements', function ()
		{
			var result = parser.parse('<div><div></div></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize nested simple block elements, divs and block inputs', function ()
		{
			var result = parser.parse('<div><input></input></div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[{"type":"htmlBlockNode","openTag":"input","closeTag":"input","attributes":[],"children":[]}]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize nested simple block elements omitting spaces', function ()
		{
			var result = parser.parse('<div>   \n  <div>\n</div>    </div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[]}]}];

			expect(result).toEqual(expeted);
		});
	});

	describe('single nodes', function ()
	{
		it('Should recognize simple single elements (input)', function ()
		{
			var result = parser.parse('<input/>')
			,	expeted = [{"type":"htmlSingleNode","tag":"input","attributes":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize simple single elements (hr)', function ()
		{
			var result = parser.parse('<hr/>')
			,	expeted = [{"type":"htmlSingleNode","tag":"hr","attributes":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize a simple single elements (hr) in-line with a block element', function ()
		{
			var result = parser.parse('<hr/><input></input>')
			,	expeted = [{"type":"htmlSingleNode","tag":"hr","attributes":[]},
							{"type":"htmlBlockNode","openTag":"input","closeTag":"input","attributes":[],"children":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize two simple single elements (hr & area)', function ()
		{
			var result = parser.parse('<hr/><area/>')
			,	expeted = [	{"type":"htmlSingleNode","tag":"hr","attributes":[]},
							{"type":"htmlSingleNode","tag":"area","attributes":[]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize html comments', function ()
		{
			var result = parser.parse('<!-- This is a comment -->')
			,	expeted = [{"type":"htmlComment","value":" This is a comment "}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize two html comments', function ()
		{
			var result = parser.parse('<!-- This is a comment --><!-- This is a comment also -->')
			,	expeted = [	{"type":"htmlComment","value":" This is a comment "},
							{"type":"htmlComment","value":" This is a comment also "}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize nested html comments in block nodes', function ()
		{
			var result = parser.parse('<span> <!-- This is a comment --> </span>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span","attributes":[],"children":[{"type":"htmlComment","value":" This is a comment "}]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize simple text', function ()
		{
			var result = parser.parse('This is a text node')
			,	expeted = [{"type":"text","value":"This is a text node"}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize simple text with single quotes', function ()
		{
			var result = parser.parse('\'This is a text node\'')
			,	expeted = [{"type":"text","value":"'This is a text node'"}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize simple text with double quotes', function ()
		{
			var result = parser.parse('"This is a text node"')
			,	expeted = [{"type":"text","value":"\"This is a text node\""}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize simple text nested in block nodes', function ()
		{
			var result = parser.parse('<div>This is a text node</div>')
			,	expeted = [{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[{"type":"text","value":"This is a text node"}]}];

			expect(result).toEqual(expeted);
		});

		it('Should recognize simple text nested in block nodes with a single node in-line', function ()
		{
			var result = parser.parse('<div>This is a text node</div><hr/>')
			,	expeted = [	{"type":"htmlBlockNode","openTag":"div","closeTag":"div","attributes":[],"children":[{"type":"text","value":"This is a text node"}]},
							{"type":"htmlSingleNode","tag":"hr","attributes":[]}];

			expect(result).toEqual(expeted);
		});
	});
});