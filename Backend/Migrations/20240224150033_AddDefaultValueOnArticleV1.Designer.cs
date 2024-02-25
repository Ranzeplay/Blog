﻿// <auto-generated />
using System;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(PersistentDbContext))]
    [Migration("20240224150033_AddDefaultValueOnArticleV1")]
    partial class AddDefaultValueOnArticleV1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Backend.Data.DbArticle", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValue(new Guid("9df4b425-6b11-447f-b16e-d18df644bb92"));

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("LastModifiedTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValue(new DateTime(2024, 2, 24, 15, 0, 32, 917, DateTimeKind.Utc).AddTicks(5934));

                    b.Property<bool>("Public")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("PublishTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValue(new DateTime(2024, 2, 24, 15, 0, 32, 917, DateTimeKind.Utc).AddTicks(5808));

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("Slug");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("Backend.Data.DbCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValue(new Guid("36446135-3b21-413c-ba07-c51b2e802831"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Backend.Data.DbComment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValue(new Guid("663425fe-8e89-47c2-b2b4-52508398772c"));

                    b.Property<Guid>("ArticleId")
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("PublishTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("SenderId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("SenderId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Backend.Data.DbTag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValue(new Guid("1713bb45-cde0-4084-9cc4-a585cd9fc822"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("Backend.Data.DbUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasDefaultValue(new Guid("0a44bd62-6385-4f5e-ab1c-77c27ab66382"));

                    b.Property<DateTime>("CreateTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValue(new DateTime(2024, 2, 24, 15, 0, 32, 917, DateTimeKind.Utc).AddTicks(5705));

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DbArticleDbTag", b =>
                {
                    b.Property<Guid>("ArticlesId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("TagsId")
                        .HasColumnType("uuid");

                    b.HasKey("ArticlesId", "TagsId");

                    b.HasIndex("TagsId");

                    b.ToTable("DbArticleDbTag");
                });

            modelBuilder.Entity("Backend.Data.DbArticle", b =>
                {
                    b.HasOne("Backend.Data.DbCategory", "Category")
                        .WithMany("Articles")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Backend.Data.DbComment", b =>
                {
                    b.HasOne("Backend.Data.DbArticle", "Article")
                        .WithMany("Comments")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Data.DbUser", "Sender")
                        .WithMany("Comments")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("DbArticleDbTag", b =>
                {
                    b.HasOne("Backend.Data.DbArticle", null)
                        .WithMany()
                        .HasForeignKey("ArticlesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Data.DbTag", null)
                        .WithMany()
                        .HasForeignKey("TagsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.Data.DbArticle", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Backend.Data.DbCategory", b =>
                {
                    b.Navigation("Articles");
                });

            modelBuilder.Entity("Backend.Data.DbUser", b =>
                {
                    b.Navigation("Comments");
                });
#pragma warning restore 612, 618
        }
    }
}
