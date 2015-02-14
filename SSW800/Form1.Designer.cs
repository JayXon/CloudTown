namespace SSW800
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            this.Quit = new System.Windows.Forms.Button();
            this.Credits = new System.Windows.Forms.Button();
            this.Settings = new System.Windows.Forms.Button();
            this.Play = new System.Windows.Forms.Button();
            this.Title = new System.Windows.Forms.Label();
            this.MenuPanel = new System.Windows.Forms.Panel();
            this.Check = new System.Windows.Forms.Button();
            this.QuestionPanel = new System.Windows.Forms.Panel();
            this.Hint_Button = new System.Windows.Forms.Button();
            this.AnswersGrid = new System.Windows.Forms.DataGridView();
            this.question = new System.Windows.Forms.Label();
            this.Checkbox = new System.Windows.Forms.DataGridViewCheckBoxColumn();
            this.Answer = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.MenuPanel.SuspendLayout();
            this.QuestionPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.AnswersGrid)).BeginInit();
            this.SuspendLayout();
            // 
            // Quit
            // 
            this.Quit.AutoSize = true;
            this.Quit.BackColor = System.Drawing.Color.Transparent;
            this.Quit.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Quit.FlatAppearance.BorderSize = 0;
            this.Quit.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Quit.Font = new System.Drawing.Font("Courier New", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Quit.ForeColor = System.Drawing.Color.Goldenrod;
            this.Quit.Location = new System.Drawing.Point(173, 480);
            this.Quit.Margin = new System.Windows.Forms.Padding(2);
            this.Quit.Name = "Quit";
            this.Quit.Size = new System.Drawing.Size(163, 69);
            this.Quit.TabIndex = 0;
            this.Quit.Text = "QUIT";
            this.Quit.UseVisualStyleBackColor = false;
            this.Quit.Click += new System.EventHandler(this.Exit_Click);
            // 
            // Credits
            // 
            this.Credits.AutoSize = true;
            this.Credits.BackColor = System.Drawing.Color.Transparent;
            this.Credits.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Credits.FlatAppearance.BorderSize = 0;
            this.Credits.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Credits.Font = new System.Drawing.Font("Courier New", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Credits.ForeColor = System.Drawing.Color.Goldenrod;
            this.Credits.Location = new System.Drawing.Point(124, 388);
            this.Credits.Margin = new System.Windows.Forms.Padding(2);
            this.Credits.Name = "Credits";
            this.Credits.Size = new System.Drawing.Size(259, 69);
            this.Credits.TabIndex = 1;
            this.Credits.Text = "CREDITS";
            this.Credits.UseVisualStyleBackColor = false;
            // 
            // Settings
            // 
            this.Settings.AutoSize = true;
            this.Settings.BackColor = System.Drawing.Color.Transparent;
            this.Settings.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Settings.FlatAppearance.BorderSize = 0;
            this.Settings.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Settings.Font = new System.Drawing.Font("Courier New", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Settings.ForeColor = System.Drawing.Color.Goldenrod;
            this.Settings.Location = new System.Drawing.Point(110, 294);
            this.Settings.Margin = new System.Windows.Forms.Padding(2);
            this.Settings.Name = "Settings";
            this.Settings.Size = new System.Drawing.Size(291, 69);
            this.Settings.TabIndex = 2;
            this.Settings.Text = "SETTINGS";
            this.Settings.UseVisualStyleBackColor = false;
            this.Settings.Click += new System.EventHandler(this.Settings_Click);
            // 
            // Play
            // 
            this.Play.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.Play.AutoSize = true;
            this.Play.BackColor = System.Drawing.Color.Transparent;
            this.Play.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Play.FlatAppearance.BorderColor = System.Drawing.Color.Black;
            this.Play.FlatAppearance.BorderSize = 0;
            this.Play.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Play.Font = new System.Drawing.Font("Courier New", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Play.ForeColor = System.Drawing.Color.Goldenrod;
            this.Play.Location = new System.Drawing.Point(173, 198);
            this.Play.Margin = new System.Windows.Forms.Padding(2);
            this.Play.Name = "Play";
            this.Play.Size = new System.Drawing.Size(163, 69);
            this.Play.TabIndex = 3;
            this.Play.Text = "PLAY";
            this.Play.UseVisualStyleBackColor = false;
            this.Play.Click += new System.EventHandler(this.Play_Click);
            // 
            // Title
            // 
            this.Title.AutoSize = true;
            this.Title.Font = new System.Drawing.Font("Courier New", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Title.ForeColor = System.Drawing.Color.Goldenrod;
            this.Title.Location = new System.Drawing.Point(29, 0);
            this.Title.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.Title.Name = "Title";
            this.Title.Size = new System.Drawing.Size(458, 54);
            this.Title.TabIndex = 4;
            this.Title.Text = "ESCAPE SEQUENCE";
            // 
            // MenuPanel
            // 
            this.MenuPanel.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.MenuPanel.Controls.Add(this.Quit);
            this.MenuPanel.Controls.Add(this.Credits);
            this.MenuPanel.Controls.Add(this.Settings);
            this.MenuPanel.Controls.Add(this.Play);
            this.MenuPanel.Controls.Add(this.Title);
            this.MenuPanel.Location = new System.Drawing.Point(372, 44);
            this.MenuPanel.Margin = new System.Windows.Forms.Padding(2);
            this.MenuPanel.Name = "MenuPanel";
            this.MenuPanel.Size = new System.Drawing.Size(512, 600);
            this.MenuPanel.TabIndex = 5;
            // 
            // Check
            // 
            this.Check.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.Check.BackColor = System.Drawing.Color.Transparent;
            this.Check.FlatAppearance.BorderSize = 0;
            this.Check.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Check.Font = new System.Drawing.Font("Courier New", 19.875F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Check.ForeColor = System.Drawing.Color.Goldenrod;
            this.Check.Location = new System.Drawing.Point(1024, 564);
            this.Check.Name = "Check";
            this.Check.Size = new System.Drawing.Size(162, 70);
            this.Check.TabIndex = 6;
            this.Check.Text = "Check";
            this.Check.UseVisualStyleBackColor = false;
            this.Check.Click += new System.EventHandler(this.Check_Click);
            // 
            // QuestionPanel
            // 
            this.QuestionPanel.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.QuestionPanel.Controls.Add(this.Check);
            this.QuestionPanel.Controls.Add(this.Hint_Button);
            this.QuestionPanel.Controls.Add(this.AnswersGrid);
            this.QuestionPanel.Controls.Add(this.question);
            this.QuestionPanel.Location = new System.Drawing.Point(18, 22);
            this.QuestionPanel.Margin = new System.Windows.Forms.Padding(2);
            this.QuestionPanel.Name = "QuestionPanel";
            this.QuestionPanel.Size = new System.Drawing.Size(1234, 674);
            this.QuestionPanel.TabIndex = 8;
            this.QuestionPanel.Visible = false;
            // 
            // Hint_Button
            // 
            this.Hint_Button.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.Hint_Button.BackColor = System.Drawing.Color.Transparent;
            this.Hint_Button.FlatAppearance.BorderSize = 0;
            this.Hint_Button.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Hint_Button.Font = new System.Drawing.Font("Courier New", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Hint_Button.ForeColor = System.Drawing.Color.Goldenrod;
            this.Hint_Button.Location = new System.Drawing.Point(1047, 502);
            this.Hint_Button.Name = "Hint_Button";
            this.Hint_Button.Size = new System.Drawing.Size(120, 46);
            this.Hint_Button.TabIndex = 10;
            this.Hint_Button.Text = "Hint";
            this.Hint_Button.UseVisualStyleBackColor = false;
            this.Hint_Button.Click += new System.EventHandler(this.Hint_Button_Click);
            // 
            // AnswersGrid
            // 
            this.AnswersGrid.AllowUserToAddRows = false;
            this.AnswersGrid.AllowUserToDeleteRows = false;
            this.AnswersGrid.AllowUserToResizeColumns = false;
            this.AnswersGrid.AllowUserToResizeRows = false;
            this.AnswersGrid.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.AnswersGrid.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.AnswersGrid.AutoSizeRowsMode = System.Windows.Forms.DataGridViewAutoSizeRowsMode.AllCells;
            this.AnswersGrid.BackgroundColor = System.Drawing.Color.Black;
            this.AnswersGrid.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.AnswersGrid.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.AnswersGrid.ClipboardCopyMode = System.Windows.Forms.DataGridViewClipboardCopyMode.Disable;
            this.AnswersGrid.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            this.AnswersGrid.ColumnHeadersVisible = false;
            this.AnswersGrid.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.Checkbox,
            this.Answer});
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.Color.Black;
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Courier New", 16.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle2.ForeColor = System.Drawing.Color.Goldenrod;
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.Color.Black;
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.Color.Goldenrod;
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.AnswersGrid.DefaultCellStyle = dataGridViewCellStyle2;
            this.AnswersGrid.EditMode = System.Windows.Forms.DataGridViewEditMode.EditProgrammatically;
            this.AnswersGrid.Location = new System.Drawing.Point(58, 158);
            this.AnswersGrid.Margin = new System.Windows.Forms.Padding(2);
            this.AnswersGrid.Name = "AnswersGrid";
            this.AnswersGrid.ReadOnly = true;
            this.AnswersGrid.RowHeadersVisible = false;
            this.AnswersGrid.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.AnswersGrid.RowTemplate.Height = 33;
            this.AnswersGrid.ScrollBars = System.Windows.Forms.ScrollBars.None;
            this.AnswersGrid.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.AnswersGrid.ShowCellErrors = false;
            this.AnswersGrid.ShowCellToolTips = false;
            this.AnswersGrid.ShowEditingIcon = false;
            this.AnswersGrid.ShowRowErrors = false;
            this.AnswersGrid.Size = new System.Drawing.Size(1090, 340);
            this.AnswersGrid.TabIndex = 9;
            this.AnswersGrid.CellMouseClick += new System.Windows.Forms.DataGridViewCellMouseEventHandler(this.AnswersGrid_CellMouseClick);
            // 
            // question
            // 
            this.question.AutoSize = true;
            this.question.Font = new System.Drawing.Font("Courier New", 36F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.question.ForeColor = System.Drawing.Color.Goldenrod;
            this.question.Location = new System.Drawing.Point(48, 28);
            this.question.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.question.MaximumSize = new System.Drawing.Size(1200, 0);
            this.question.Name = "question";
            this.question.Size = new System.Drawing.Size(254, 50);
            this.question.TabIndex = 8;
            this.question.Text = "Question";
            // 
            // Checkbox
            // 
            this.Checkbox.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.TopLeft;
            dataGridViewCellStyle1.NullValue = false;
            dataGridViewCellStyle1.Padding = new System.Windows.Forms.Padding(0, 4, 0, 0);
            this.Checkbox.DefaultCellStyle = dataGridViewCellStyle1;
            this.Checkbox.FillWeight = 10F;
            this.Checkbox.HeaderText = "";
            this.Checkbox.Name = "Checkbox";
            this.Checkbox.ReadOnly = true;
            this.Checkbox.Resizable = System.Windows.Forms.DataGridViewTriState.False;
            // 
            // Answer
            // 
            this.Answer.FillWeight = 787.868F;
            this.Answer.HeaderText = "";
            this.Answer.Name = "Answer";
            this.Answer.ReadOnly = true;
            this.Answer.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(96F, 96F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Dpi;
            this.BackColor = System.Drawing.Color.Black;
            this.CancelButton = this.Quit;
            this.ClientSize = new System.Drawing.Size(1280, 720);
            this.Controls.Add(this.MenuPanel);
            this.Controls.Add(this.QuestionPanel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "Form1";
            this.Text = "Form1";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.MenuPanel.ResumeLayout(false);
            this.MenuPanel.PerformLayout();
            this.QuestionPanel.ResumeLayout(false);
            this.QuestionPanel.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.AnswersGrid)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button Quit;
        private System.Windows.Forms.Button Credits;
        private System.Windows.Forms.Button Settings;
        private System.Windows.Forms.Button Play;
        private System.Windows.Forms.Label Title;
        private System.Windows.Forms.Panel MenuPanel;
        private System.Windows.Forms.Button Check;
        private System.Windows.Forms.Panel QuestionPanel;
        private System.Windows.Forms.Label question;
        private System.Windows.Forms.DataGridView AnswersGrid;
        private System.Windows.Forms.Button Hint_Button;
        private System.Windows.Forms.DataGridViewCheckBoxColumn Checkbox;
        private System.Windows.Forms.DataGridViewTextBoxColumn Answer;
    }
}

