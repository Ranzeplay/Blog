using Microsoft.AspNetCore.StaticFiles;

namespace Blog.Models
{
    public class BlogAsset
    {
        public string ContentType { get; }

        public byte[] Content { get; }

        public BlogAsset(string contentType, byte[] content)
        {
            ContentType = contentType;
            Content = content;
        }

        public BlogAsset(string filePath) {
            if (File.Exists(filePath))
            {
                new FileExtensionContentTypeProvider().TryGetContentType(filePath, out var contentType);
                ContentType = contentType!;

                Content = File.ReadAllBytes(filePath);
            }
            
            throw new FileNotFoundException($"Coudn't acquire the requested asset \"{filePath}\"");
        }
    }
}
