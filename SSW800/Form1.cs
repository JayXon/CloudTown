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
        private List<quiz> questions = null;
        HashSet<int> AskedQuestions;

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
                questions = new List<quiz>();
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

                    questions.Add(Quiz);
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
                formatter.Serialize(fs, questions);
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
                questions = (List<quiz>)formatter.Deserialize(fs);
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
            AskedQuestions = new HashSet<int>();

            QuestionPanel.Show();
        }



        /// <summary>
        /// Shows a Question on screen.
        /// </summary>
        private void NewQuestion()
        {
            if (AskedQuestions.Count == questions.Count)
            {
                MessageBox.Show("Run out of questions!");
                QuestionPanel.Hide();
                MenuPanel.Show();
                return;
            }

            Random rnd = new Random();

            // Randomly select a question
            int questionIndex = rnd.Next(0, questions.Count);

            while (AskedQuestions.Contains(questionIndex))
            {
                questionIndex = (questionIndex + 1) % questions.Count;
            }
            AskedQuestions.Add(questionIndex);

            question.Text = questions[questionIndex].question;


            // Randomly select answers, at most 2 correct answers will be selected
            int numberOfCorrect = rnd.Next(1, Math.Min(3, questions[questionIndex].correctAnswers.Count + 1));
            HashSet<int> selectedIndex = new HashSet<int>();
            List<string> answerList = questions[questionIndex].correctAnswers;

            //answersCheckedListBox.Items.Clear();
            AnswersGrid.Rows.Clear();
            for (int i = 0; i < 4; i++)
            {
                if (i == numberOfCorrect)
                {
                    selectedIndex.Clear();
                    answerList = questions[questionIndex].wrongAnswers;
                }
                int k = rnd.Next(0, answerList.Count);
                while (selectedIndex.Contains(k))
                {
                    k = (k + 1) % answerList.Count;
                }
                selectedIndex.Add(k);

                //answersCheckedListBox.Items.Add(answerList[k]);
                AnswersGrid.Rows.Add(false, answerList[k]);
            }

        }

        private void Play_Click(object sender, EventArgs e)
        {
            if (questions == null)
            {
                LoadQuizFromBinaryFile("quiz.dat");
                if (questions == null)
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
                if (questions == null)
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
            NewQuestion();
        }

        void AnswersGrid_CellMouseClick(object sender, DataGridViewCellMouseEventArgs e)
        {
            DataGridViewCell chk = AnswersGrid.Rows[e.RowIndex].Cells[0];
            chk.Value = !(bool)chk.Value;
        }
    }
}
