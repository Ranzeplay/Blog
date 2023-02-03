using Blog.Models.Article;
using Markdig;
using Markdig.Extensions.Yaml;
using Markdig.Syntax;
using Microsoft.Extensions.Hosting;
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

            var yamlDeserializer = new DeserializerBuilder()
                    .WithNamingConvention(CamelCaseNamingConvention.Instance)
                    .Build();

            using (var input = new StringReader(text))
            {
                var parser = new Parser(input);
                parser.Consume<StreamStart>();
                parser.Consume<DocumentStart>();
                var metadata = yamlDeserializer.Deserialize<ArticleMetadata>(parser);
                parser.Consume<DocumentEnd>();

                if (metadata != null)
                {
                    var html = Markdown.ToHtml(document, pipeline);

                    return new()
                    {
                        HtmlContent = html,
                        Metadata = metadata
                    };
                }
            }

            return null;
        }
    }
}
