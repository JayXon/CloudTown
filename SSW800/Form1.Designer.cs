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
            this.label1 = new System.Windows.Forms.Label();
            this.panel1 = new System.Windows.Forms.Panel();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // Quit
            // 
            this.Quit.BackColor = System.Drawing.Color.Transparent;
            this.Quit.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Quit.FlatAppearance.BorderSize = 0;
            this.Quit.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Quit.Font = new System.Drawing.Font("Courier New", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Quit.ForeColor = System.Drawing.Color.Goldenrod;
            this.Quit.Location = new System.Drawing.Point(168, 495);
            this.Quit.Name = "Quit";
            this.Quit.Size = new System.Drawing.Size(200, 48);
            this.Quit.TabIndex = 0;
            this.Quit.Text = "QUIT";
            this.Quit.UseVisualStyleBackColor = false;
            this.Quit.Click += new System.EventHandler(this.Exit_Click);
            // 
            // Credits
            // 
            this.Credits.BackColor = System.Drawing.Color.Transparent;
            this.Credits.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Credits.FlatAppearance.BorderSize = 0;
            this.Credits.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Credits.Font = new System.Drawing.Font("Courier New", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Credits.ForeColor = System.Drawing.Color.Goldenrod;
            this.Credits.Location = new System.Drawing.Point(168, 406);
            this.Credits.Name = "Credits";
            this.Credits.Size = new System.Drawing.Size(200, 48);
            this.Credits.TabIndex = 1;
            this.Credits.Text = "CREDITS";
            this.Credits.UseVisualStyleBackColor = false;
            // 
            // Settings
            // 
            this.Settings.BackColor = System.Drawing.Color.Transparent;
            this.Settings.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Settings.FlatAppearance.BorderSize = 0;
            this.Settings.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Settings.Font = new System.Drawing.Font("Courier New", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Settings.ForeColor = System.Drawing.Color.Goldenrod;
            this.Settings.Location = new System.Drawing.Point(168, 311);
            this.Settings.Name = "Settings";
            this.Settings.Size = new System.Drawing.Size(200, 48);
            this.Settings.TabIndex = 2;
            this.Settings.Text = "SETTINGS";
            this.Settings.UseVisualStyleBackColor = false;
            // 
            // Play
            // 
            this.Play.BackColor = System.Drawing.Color.Transparent;
            this.Play.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Play.FlatAppearance.BorderColor = System.Drawing.Color.Black;
            this.Play.FlatAppearance.BorderSize = 0;
            this.Play.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Play.Font = new System.Drawing.Font("Courier New", 10.125F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Play.ForeColor = System.Drawing.Color.Goldenrod;
            this.Play.Location = new System.Drawing.Point(168, 220);
            this.Play.Name = "Play";
            this.Play.Size = new System.Drawing.Size(200, 48);
            this.Play.TabIndex = 3;
            this.Play.Text = "PLAY";
            this.Play.UseVisualStyleBackColor = false;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Courier New", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.Goldenrod;
            this.label1.Location = new System.Drawing.Point(109, 62);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(300, 36);
            this.label1.TabIndex = 4;
            this.label1.Text = "ESCAPE SEQUENCE";
            // 
            // panel1
            // 
            this.panel1.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.panel1.Controls.Add(this.Quit);
            this.panel1.Controls.Add(this.Credits);
            this.panel1.Controls.Add(this.Settings);
            this.panel1.Controls.Add(this.Play);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Location = new System.Drawing.Point(372, 59);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(536, 578);
            this.panel1.TabIndex = 5;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(192F, 192F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Dpi;
            this.BackColor = System.Drawing.Color.Black;
            this.CancelButton = this.Quit;
            this.ClientSize = new System.Drawing.Size(1254, 649);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "Form1";
            this.Text = "Form1";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button Quit;
        private System.Windows.Forms.Button Credits;
        private System.Windows.Forms.Button Settings;
        private System.Windows.Forms.Button Play;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Panel panel1;
    }
}

