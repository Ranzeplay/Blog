using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class ManualRelationV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DbArticleDbTag_Articles_ArticlesId",
                table: "DbArticleDbTag");

            migrationBuilder.DropForeignKey(
                name: "FK_DbArticleDbTag_Tags_TagsId",
                table: "DbArticleDbTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DbArticleDbTag",
                table: "DbArticleDbTag");

            migrationBuilder.RenameTable(
                name: "DbArticleDbTag",
                newName: "ArticleTag");

            migrationBuilder.RenameIndex(
                name: "IX_DbArticleDbTag_TagsId",
                table: "ArticleTag",
                newName: "IX_ArticleTag_TagsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArticleTag",
                table: "ArticleTag",
                columns: new[] { "ArticlesId", "TagsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleTag_Articles_ArticlesId",
                table: "ArticleTag",
                column: "ArticlesId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleTag_Tags_TagsId",
                table: "ArticleTag",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleTag_Articles_ArticlesId",
                table: "ArticleTag");

            migrationBuilder.DropForeignKey(
                name: "FK_ArticleTag_Tags_TagsId",
                table: "ArticleTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArticleTag",
                table: "ArticleTag");

            migrationBuilder.RenameTable(
                name: "ArticleTag",
                newName: "DbArticleDbTag");

            migrationBuilder.RenameIndex(
                name: "IX_ArticleTag_TagsId",
                table: "DbArticleDbTag",
                newName: "IX_DbArticleDbTag_TagsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DbArticleDbTag",
                table: "DbArticleDbTag",
                columns: new[] { "ArticlesId", "TagsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_DbArticleDbTag_Articles_ArticlesId",
                table: "DbArticleDbTag",
                column: "ArticlesId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DbArticleDbTag_Tags_TagsId",
                table: "DbArticleDbTag",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
