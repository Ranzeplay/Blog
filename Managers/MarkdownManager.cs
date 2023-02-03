using Blog.Models.Article;
using Markdig;
using Markdig.Extensions.Yaml;
using Markdig.Syntax;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;
using YamlDotNet.Core;
using YamlDotNet.Core.Events;
using YamlDotNet.RepresentationModel;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace Blog.Managers
{
    public class MarkdownManager
    {
        public static ArticleViewModel? ParseArticleFile(string text)
        {
            var pipeline = new MarkdownPipelineBuilder()
                .UseAdvancedExtensions()
                .UseYamlFrontMatter()
                .UseBootstrap()
                .Build();

            var document = Markdown.Parse(text, pipeline);

            // Parse metadata
            var metadata = ParseArticleMetadata(text);
            if (metadata != null)
            {
                // Parse content
                var html = Markdown.ToHtml(document, pipeline);

                return new()
                {
                    HtmlContent = html,
                    Metadata = metadata
                };
            }

            return null;
        }

        public static ArticleMetadata? ParseArticleMetadata(string text)
        {
            var input = new StringReader(text);
            var yamlDeserializer = new DeserializerBuilder()
                .WithNamingConvention(CamelCaseNamingConvention.Instance)
                .Build();

            var parser = new Parser(input);
            parser.Consume<StreamStart>();
            parser.Consume<DocumentStart>();
            var metadata = yamlDeserializer.Deserialize<ArticleMetadata>(parser);
            parser.Consume<DocumentEnd>();

            return metadata;
        }
    }
}
