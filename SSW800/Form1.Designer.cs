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
            this.Quit = new System.Windows.Forms.Button();
            this.Credits = new System.Windows.Forms.Button();
            this.Settings = new System.Windows.Forms.Button();
            this.Play = new System.Windows.Forms.Button();
            this.Title = new System.Windows.Forms.Label();
            this.MenuPanel = new System.Windows.Forms.Panel();
            this.Check = new System.Windows.Forms.Button();
            this.MenuPanel.SuspendLayout();
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
            this.Quit.Location = new System.Drawing.Point(198, 482);
            this.Quit.Margin = new System.Windows.Forms.Padding(2);
            this.Quit.Name = "Quit";
            this.Quit.Size = new System.Drawing.Size(100, 40);
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
            this.Credits.Location = new System.Drawing.Point(183, 389);
            this.Credits.Margin = new System.Windows.Forms.Padding(2);
            this.Credits.Name = "Credits";
            this.Credits.Size = new System.Drawing.Size(135, 40);
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
            this.Settings.Location = new System.Drawing.Point(173, 296);
            this.Settings.Margin = new System.Windows.Forms.Padding(2);
            this.Settings.Name = "Settings";
            this.Settings.Size = new System.Drawing.Size(151, 40);
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
            this.Play.Location = new System.Drawing.Point(198, 205);
            this.Play.Margin = new System.Windows.Forms.Padding(2);
            this.Play.Name = "Play";
            this.Play.Size = new System.Drawing.Size(100, 40);
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
            this.MenuPanel.Location = new System.Drawing.Point(384, 60);
            this.MenuPanel.Margin = new System.Windows.Forms.Padding(2);
            this.MenuPanel.Name = "MenuPanel";
            this.MenuPanel.Size = new System.Drawing.Size(512, 600);
            this.MenuPanel.TabIndex = 5;
            // 
            // Check
            // 
            this.Check.Location = new System.Drawing.Point(44, 38);
            this.Check.Name = "Check";
            this.Check.Size = new System.Drawing.Size(75, 23);
            this.Check.TabIndex = 6;
            this.Check.Text = "Check";
            this.Check.UseVisualStyleBackColor = true;
            this.Check.Click += new System.EventHandler(this.Check_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(96F, 96F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Dpi;
            this.BackColor = System.Drawing.Color.Black;
            this.CancelButton = this.Quit;
            this.ClientSize = new System.Drawing.Size(1280, 720);
            this.Controls.Add(this.Check);
            this.Controls.Add(this.MenuPanel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "Form1";
            this.Text = "Form1";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.MenuPanel.ResumeLayout(false);
            this.MenuPanel.PerformLayout();
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
    }
}

