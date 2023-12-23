using LocalService.Models;
using Markdig;
using Markdig.Extensions.Yaml;
using Markdig.Syntax;
using YamlDotNet.Core;
using YamlDotNet.Core.Events;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace LocalService.Services
{
    public class MarkdownService
    {
        private readonly IDeserializer _yamlDeserializer;
        private readonly MarkdownPipeline _markdownPipeline;

        public MarkdownService()
        {
            _yamlDeserializer = new DeserializerBuilder()
                .WithNamingConvention(CamelCaseNamingConvention.Instance)
                .Build();

            _markdownPipeline = new MarkdownPipelineBuilder()
               .UseAdvancedExtensions()
               .UseYamlFrontMatter()
               .Build();
        }

        public Article? ParseArticle(string text)
        {
            var document = Markdown.Parse(text, _markdownPipeline);

            // Parse metadata
            var metadata = ParseMetadata<ArticleMetadata>(text);
            if (metadata != null)
            {
                var yamlBlock = document.Descendants<YamlFrontMatterBlock>().FirstOrDefault();
                if (yamlBlock != null)
                {
                    string yaml = text.Substring(yamlBlock.Span.Start, yamlBlock.Span.Length);
                    text = text[yaml.Length..];
                }

                return new(metadata, text.TrimStart('\n'));
            }

            return null;
        }

        public T? ParseMetadata<T>(string text)
        {
            var input = new StringReader(text);
            var parser = new Parser(input);
            parser.Consume<StreamStart>();
            parser.Consume<DocumentStart>();
            var metadata = _yamlDeserializer.Deserialize<T>(parser);
            parser.Consume<DocumentEnd>();

            return metadata;
        }
    }
}
