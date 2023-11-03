using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public partial class AvaliacaoCompetenciasDbContext : DbContext
{
    public AvaliacaoCompetenciasDbContext()
    {
    }

    public AvaliacaoCompetenciasDbContext(DbContextOptions<AvaliacaoCompetenciasDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AvaliacaoEvaluation> AvaliacaoEvaluations { get; set; }

    public virtual DbSet<AvaliacaoFormTemplate> AvaliacaoFormTemplates { get; set; }

    public virtual DbSet<AvaliacaoQuestion> AvaliacaoQuestions { get; set; }

    public virtual DbSet<AvaliacaoScale> AvaliacaoScales { get; set; }

    public virtual DbSet<AvaliacaoScaleTemplate> AvaliacaoScaleTemplates { get; set; }

    public virtual DbSet<AvaliacaoUniqueAn> AvaliacaoUniqueAns { get; set; }

    public virtual DbSet<AvaliacaoUniqueAnsTemplate> AvaliacaoUniqueAnsTemplates { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=ULTRACHEESE-FIX\\SQLEXPRESS;Initial Catalog=AvaliacaoCompetenciasDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AvaliacaoEvaluation>(entity =>
        {
            entity.HasKey(e => e.EvaluationId).HasName("PK__Avaliaca__053C90BB2801A9BE");

            entity.ToTable("Avaliacao_Evaluation");

            entity.Property(e => e.EvaluationId).HasColumnName("evaluationId");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.DateEnd)
                .HasColumnType("datetime")
                .HasColumnName("dateEnd");
            entity.Property(e => e.DateStart)
                .HasColumnType("datetime")
                .HasColumnName("dateStart");
            entity.Property(e => e.FormTemplateId).HasColumnName("formTemplateId");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("title");

            entity.HasOne(d => d.FormTemplate).WithMany(p => p.AvaliacaoEvaluations)
                .HasForeignKey(d => d.FormTemplateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Avaliacao__formT__59FA5E80");
        });

        modelBuilder.Entity<AvaliacaoFormTemplate>(entity =>
        {
            entity.HasKey(e => e.FormTemplateId).HasName("PK__Avaliaca__2C0FDEE7413C769C");

            entity.ToTable("Avaliacao_FormTemplate");

            entity.Property(e => e.FormTemplateId).HasColumnName("formTemplateId");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.CreationDate)
                .HasColumnType("datetime")
                .HasColumnName("creationDate");
            entity.Property(e => e.LastModificationDate)
                .HasColumnType("datetime")
                .HasColumnName("lastModificationDate");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        modelBuilder.Entity<AvaliacaoQuestion>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK__Avaliaca__6238D4B28EEB6E12");

            entity.ToTable("Avaliacao_Question");

            entity.Property(e => e.QuestionId).HasColumnName("questionId");
            entity.Property(e => e.DescriptionEn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionEN");
            entity.Property(e => e.DescriptionEs)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionES");
            entity.Property(e => e.DescriptionFr)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionFR");
            entity.Property(e => e.DescriptionPl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionPL");
            entity.Property(e => e.DescriptionPt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionPT");
            entity.Property(e => e.FormTemplateId).HasColumnName("formTemplateId");
            entity.Property(e => e.Mandatory).HasColumnName("mandatory");
            entity.Property(e => e.ScaleTemplateId).HasColumnName("scaleTemplateId");
            entity.Property(e => e.Type).HasColumnName("type");
            entity.Property(e => e.UniqueAnswerTemplateId).HasColumnName("uniqueAnswerTemplateId");

            entity.HasOne(d => d.FormTemplate).WithMany(p => p.AvaliacaoQuestions)
                .HasForeignKey(d => d.FormTemplateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Avaliacao__formT__5535A963");

            entity.HasOne(d => d.ScaleTemplate).WithMany(p => p.AvaliacaoQuestions)
                .HasForeignKey(d => d.ScaleTemplateId)
                .HasConstraintName("FK__Avaliacao__scale__5629CD9C");

            entity.HasOne(d => d.UniqueAnswerTemplate).WithMany(p => p.AvaliacaoQuestions)
                .HasForeignKey(d => d.UniqueAnswerTemplateId)
                .HasConstraintName("FK__Avaliacao__uniqu__571DF1D5");
        });

        modelBuilder.Entity<AvaliacaoScale>(entity =>
        {
            entity.HasKey(e => e.ScaleId).HasName("PK__Avaliaca__ABB27251A197CBD2");

            entity.ToTable("Avaliacao_Scale");

            entity.Property(e => e.ScaleId).HasColumnName("scaleId");
            entity.Property(e => e.DescriptionEn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionEN");
            entity.Property(e => e.DescriptionEs)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionES");
            entity.Property(e => e.DescriptionFr)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionFR");
            entity.Property(e => e.DescriptionPl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionPL");
            entity.Property(e => e.DescriptionPt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionPT");
            entity.Property(e => e.ScaleTemplateId).HasColumnName("scaleTemplateId");
            entity.Property(e => e.Value).HasColumnName("value");

            entity.HasOne(d => d.ScaleTemplate).WithMany(p => p.AvaliacaoScales)
                .HasForeignKey(d => d.ScaleTemplateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Avaliacao__scale__4F7CD00D");
        });

        modelBuilder.Entity<AvaliacaoScaleTemplate>(entity =>
        {
            entity.HasKey(e => e.ScaleTemplateId).HasName("PK__Avaliaca__3B478EEC18324888");

            entity.ToTable("Avaliacao_ScaleTemplate");

            entity.Property(e => e.ScaleTemplateId).HasColumnName("scaleTemplateId");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.CreationDate)
                .HasColumnType("datetime")
                .HasColumnName("creationDate");
            entity.Property(e => e.LastModificationDate)
                .HasColumnType("datetime")
                .HasColumnName("lastModificationDate");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        modelBuilder.Entity<AvaliacaoUniqueAn>(entity =>
        {
            entity.HasKey(e => e.UniqueAnswerId).HasName("PK__Avaliaca__5D0460A82B9E6A23");

            entity.ToTable("Avaliacao_UniqueAns");

            entity.Property(e => e.UniqueAnswerId).HasColumnName("uniqueAnswerId");
            entity.Property(e => e.DescriptionEn)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionEN");
            entity.Property(e => e.DescriptionEs)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionES");
            entity.Property(e => e.DescriptionFr)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionFR");
            entity.Property(e => e.DescriptionPl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionPL");
            entity.Property(e => e.DescriptionPt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descriptionPT");
            entity.Property(e => e.UniqueAnswerTemplateId).HasColumnName("uniqueAnswerTemplateId");
            entity.Property(e => e.Value).HasColumnName("value");

            entity.HasOne(d => d.UniqueAnswerTemplate).WithMany(p => p.AvaliacaoUniqueAns)
                .HasForeignKey(d => d.UniqueAnswerTemplateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Avaliacao__uniqu__52593CB8");
        });

        modelBuilder.Entity<AvaliacaoUniqueAnsTemplate>(entity =>
        {
            entity.HasKey(e => e.UniqueAnswerTemplateId).HasName("PK__Avaliaca__D2BA435E6B108A07");

            entity.ToTable("Avaliacao_UniqueAnsTemplate");

            entity.Property(e => e.UniqueAnswerTemplateId).HasColumnName("uniqueAnswerTemplateId");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.CreationDate)
                .HasColumnType("datetime")
                .HasColumnName("creationDate");
            entity.Property(e => e.LastModificationDate)
                .HasColumnType("datetime")
                .HasColumnName("lastModificationDate");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
