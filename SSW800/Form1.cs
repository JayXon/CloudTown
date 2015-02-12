using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SSW800
{
    public partial class Form1 : Form
    {
        private List<quiz> quizes = null;
        System.Windows.Forms.Label question;
        System.Windows.Forms.Button[] answersButton;

        [Serializable()]
        struct quiz
        {
            public int ID;
            public string topic;
            public string question;
            public string hint;
            public int difficulty;
            public List<string> correctAnswers;
            public List<string> wrongAnswers;
        }

        public Form1()
        {
            InitializeComponent();
        }

#if DEBUG
        /// <summary>
        /// Reads quiz from Excel file
        /// </summary>
        /// <param name="file"></param>
        private void LoadQuizFromExcelFile(string file)
        {
            try
            {
                Microsoft.Office.Interop.Excel.Application app = new Microsoft.Office.Interop.Excel.Application();
                Microsoft.Office.Interop.Excel.Workbook workbook = app.Workbooks.Open(file);
                Microsoft.Office.Interop.Excel.Worksheet worksheet = workbook.Worksheets[1];
                int rows = worksheet.Rows.CurrentRegion.EntireRow.Count;
                quizes = new List<quiz>();
                for (int i = 2; i <= rows; i++)
                {
                    quiz Quiz = new quiz();
                    Quiz.ID = (int)worksheet.Cells[i, 1].Value;
                    Quiz.topic = worksheet.Cells[i, 2].Value;
                    Quiz.question = worksheet.Cells[i, 3].Value;
                    Quiz.hint = worksheet.Cells[i, 4].Value;
                    Quiz.difficulty = (int)(worksheet.Cells[i, 5].Value ?? -1);
                    int numberOfCorrect = (int)(worksheet.Cells[i, 6].Value ?? -1);
                    Quiz.correctAnswers = new List<string>();
                    for (int j = 7; j < 7 + numberOfCorrect; j++)
                    {
                        Quiz.correctAnswers.Add(worksheet.Cells[i, j].Value);
                    }
                    Quiz.wrongAnswers = new List<string>();
                    for (int j = 7 + numberOfCorrect; worksheet.Cells[i, j].Value != null; j++)
                    {
                        Quiz.wrongAnswers.Add(worksheet.Cells[i, j].Value);
                    }

                    quizes.Add(Quiz);
                }
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
        } // End LoadQuizFromExcelFile


        /// <summary>
        /// Save quiz to binary file
        /// </summary>
        /// <param name="file"></param>
        private void SaveQuizToBinaryFile(string file)
        {
            FileStream fs = null;
            try
            {
                fs = new FileStream(file, FileMode.Create);
                BinaryFormatter formatter = new BinaryFormatter();
                formatter.TypeFormat = System.Runtime.Serialization.Formatters.FormatterTypeStyle.TypesWhenNeeded;
                formatter.Serialize(fs, quizes);
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
            finally
            {
                if (fs != null)
                {
                    fs.Close();
                }
            }
        }
#endif


        /// <summary>
        /// Read quiz from binary file.
        /// Called when the user presses PLAY.
        /// </summary>
        /// <param name="file"></param>
        private void LoadQuizFromBinaryFile(string file)
        {
            FileStream fs = null;
            try
            {
                fs = new FileStream(file, FileMode.Open);
                BinaryFormatter formatter = new BinaryFormatter();
                quizes = (List<quiz>)formatter.Deserialize(fs);
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
            finally
            {
                if (fs != null)
                {
                    fs.Close();
                }
            }
        }

        private void InitializeQuiz()
        {
            // Show question
            question = new System.Windows.Forms.Label();
            question.AutoSize = true;
            question.Font = new System.Drawing.Font("Courier New", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            question.ForeColor = System.Drawing.Color.Goldenrod;
            question.Location = new System.Drawing.Point(64, 48);
            Controls.Add(question);


            // Show answers button
            answersButton = new System.Windows.Forms.Button[4];
            for (int i = 0; i < 4; i++)
            {
                answersButton[i] = new System.Windows.Forms.Button();
                answersButton[i].AutoSize = true;
                answersButton[i].Font = new System.Drawing.Font("Courier New", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
                answersButton[i].ForeColor = System.Drawing.Color.Goldenrod;
                answersButton[i].BackColor = System.Drawing.Color.Transparent;
                answersButton[i].FlatAppearance.BorderSize = 0;
                answersButton[i].FlatStyle = System.Windows.Forms.FlatStyle.Flat;
                answersButton[i].Location = new System.Drawing.Point(64, 48 + 96 + 48 * i);
                answersButton[i].Click += new System.EventHandler(this.Answer_Click);
                answersButton[i].TextAlign = ContentAlignment.MiddleLeft;
                Controls.Add(answersButton[i]);
            }
        }


        /// <summary>
        /// Shows a Question on screen.
        /// </summary>
        private void NewQuestion()
        {
            /*
            // Show question
            System.Windows.Forms.Label question = new System.Windows.Forms.Label();
            question.AutoSize = true;
            question.Text = quizes[0].question;
            question.Font = new System.Drawing.Font("Courier New", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            question.ForeColor = System.Drawing.Color.Goldenrod;
            question.Location = new System.Drawing.Point(64, 48);
            Controls.Add(question); */


            question.Text = quizes[0].question;

            // Randomly select answers, at most 2 correct answers will be selected
            string[] selectedAnswers = new string[4];
            Random rnd = new Random();
            int numberOfCorrect = rnd.Next(1, Math.Min(3, quizes[0].correctAnswers.Count + 1));
            HashSet<int> selectedIndex = new HashSet<int>();
            List<string> answerList = quizes[0].correctAnswers;
            for (int i = 0; i < 4; i++)
            {
                int j = rnd.Next(0, 4);
                while (selectedAnswers[j] != null)
                {
                    j = (j + 1) % 4;
                }
                if (i == numberOfCorrect)
                {
                    selectedIndex.Clear();
                    answerList = quizes[0].wrongAnswers;
                }
                int k = rnd.Next(0, answerList.Count);
                while (selectedIndex.Contains(k))
                {
                    k = (k + 1) % answerList.Count;
                }
                selectedIndex.Add(k);
                selectedAnswers[j] = answerList[k];
            }


            for (int i = 0; i < 4; i++)
            {
                answersButton[i].Text = selectedAnswers[i];
            }

            // CHECK Button
            //System.Windows.Forms.Button checkButton = new System.Windows.Forms.Button();
            //Controls.Add(checkButton);
        }

        private void Play_Click(object sender, EventArgs e)
        {
            if (quizes == null)
            {
                LoadQuizFromBinaryFile("quiz.dat");
                if (quizes == null)
                {
                    return;
                }
            }
            MenuPanel.Hide();
            InitializeQuiz();
            NewQuestion();
        }

        private void Settings_Click(object sender, EventArgs e)
        {
#if DEBUG
            // convert quizes in Excel to binary file
            OpenFileDialog openFileDialog1 = new OpenFileDialog();
            openFileDialog1.Filter = "Excel files (xls, xlsx)|*.xls;*.xlsx|All files|*.*";
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                LoadQuizFromExcelFile(openFileDialog1.FileName);
                if (quizes == null)
                {
                    return;
                }
                SaveQuizToBinaryFile("quiz.dat");

                MessageBox.Show("Done.");
            }
#endif
        }

        private void Exit_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Check_Click(object sender, EventArgs e)
        {
            MessageBox.Show("hello");
        }

        private void Answer_Click(object sender, EventArgs e)
        {
            // MessageBox.Show("WRONG!");
            NewQuestion();
        }
    }
}
