//SLAVIK
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Office.Interop.Excel;
namespace SSW800
{
    public partial class Form1 : Form
    {
        private Microsoft.Office.Interop.Excel.Application app = null;
        private Workbook workbook = null;
        private Worksheet worksheet = null;

        ArrayList quizes = new ArrayList();
        /// <summary>
        /// Opens a given Excel file.
        /// </summary>
        /// <param name="file"></param>
        struct quiz
        {
           
           public int ID;
            public string topic;
            public string question;
            public string hint;
            public int difficulty;
            public ArrayList correctAnswers;
            public ArrayList wrongAnswers;
        }
        private void openExcelApp(string file)
        {
            try
            {
                app = new Microsoft.Office.Interop.Excel.Application();
                app.Visible = false;
                workbook = app.Workbooks.Open(System.IO.Directory.GetCurrentDirectory() + "\\" + file); 
                worksheet = (Worksheet)workbook.Worksheets[1];
                readFromExcelFile();
            }

            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
        } // End  openExcelApp  

        /// <summary>
        /// Reads info from Questions.xlsx file
        /// </summary>
        private void readFromExcelFile()
        {
          int rows = worksheet.Rows.CurrentRegion.EntireRow.Count;
          for (int i = 2; i <= rows ; i++)
          {
              quiz Quiz = new quiz();
              Quiz.ID = (int)(worksheet.Cells[i, 1] as Range).Value;
              Quiz.topic = (string)(worksheet.Cells[i, 2] as Range).Value;
              Quiz.question = (string)(worksheet.Cells[i, 3] as Range).Value;
              Quiz.hint = (string)(worksheet.Cells[i, 4] as Range).Value;
              Quiz.difficulty = (int)(worksheet.Cells[i, 1] as Range).Value;
              int numberOfCorrect = (int)(worksheet.Cells[i, 1] as Range).Value;
              Quiz.correctAnswers = new ArrayList();
              for (int j = 7; j < 7 + numberOfCorrect; j++)
              {
                  Quiz.correctAnswers.Add((string)(worksheet.Cells[i, j] as Range).Value);
              }
              Quiz.wrongAnswers = new ArrayList();
              for (int j = 7 + numberOfCorrect; (worksheet.Cells[i, j] as Range).Value != null ; j++)
              {
                  Quiz.wrongAnswers.Add((string)(worksheet.Cells[i, j] as Range).Value);
              }

              //MessageBox.Show("Everything is alright");

              quizes.Add(Quiz);
             
          }
        }// End readFromExcelFile

        private void showQuiz()
        {
            System.Windows.Forms.Label question = new System.Windows.Forms.Label();
            question.AutoSize = true;
            question.Text = ((quiz)quizes[0]).question;
            question.Font = new System.Drawing.Font("Courier New", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            question.ForeColor = System.Drawing.Color.Goldenrod;
            question.Location = new System.Drawing.Point(64, 48);
            Controls.Add(question);

            Random rnd = new Random();
            System.Windows.Forms.Button []answer = new System.Windows.Forms.Button[4];
            int numberOfCorrect = rnd.Next(1, 3);
            numberOfCorrect = Math.Min(numberOfCorrect, ((quiz)quizes[0]).correctAnswers.Count);
            string[] selectedAnswers = new string[4];
            HashSet<int> selectedCorrectAnswersIndex = new HashSet<int>();
            HashSet<int> selectedWrongAnswersIndex = new HashSet<int>();
            for (int i = 0; i < numberOfCorrect; i++)
            {
                int j = rnd.Next(0, 4);
                while (selectedAnswers[j] != null)
                    j = (j + 1) % 4;
                int k = rnd.Next(0, ((quiz)quizes[0]).correctAnswers.Count);
                while (selectedCorrectAnswersIndex.Contains(k))
                    k = (k + 1) % ((quiz)quizes[0]).correctAnswers.Count;
                selectedCorrectAnswersIndex.Add(k);
                selectedAnswers[j] = (string)((quiz)quizes[0]).correctAnswers[k];
            }
            for (int i = numberOfCorrect; i < 4; i++)
            {
                int j = rnd.Next(0, 4);
                while (selectedAnswers[j] != null)
                    j = (j + 1) % 4;
                int k = rnd.Next(0, ((quiz)quizes[0]).wrongAnswers.Count);
                while (selectedWrongAnswersIndex.Contains(k))
                    k = (k + 1) % ((quiz)quizes[0]).wrongAnswers.Count;
                selectedWrongAnswersIndex.Add(k);
                selectedAnswers[j] = (string)((quiz)quizes[0]).wrongAnswers[k];
            }
            for (int i = 0; i < 4; i++)
            {
                answer[i] = new System.Windows.Forms.Button();
                answer[i].AutoSize = true;
                answer[i].Text = selectedAnswers[i];
                answer[i].Font = new System.Drawing.Font("Courier New", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
                answer[i].ForeColor = System.Drawing.Color.Goldenrod;
                answer[i].Location = new System.Drawing.Point(64, 48 + 96 + 48 * i);
                Controls.Add(answer[i]);

            }
        }
        public Form1()
        {
            InitializeComponent();
        }

        private void Exit_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Play_Click(object sender, EventArgs e)
        {
            openExcelApp("Questions.xlsx");
            panel1.Hide();
            showQuiz();
        }
    }
}
