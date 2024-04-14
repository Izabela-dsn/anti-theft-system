using Microsoft.Web.WebView2.Core;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Windows.Forms.DataVisualization.Charting;

namespace ModuloTres
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            Listener();
            LoadGraphs(HandleIEDGraph());
            webView21.EnsureCoreWebView2Async(null);
            webView21.CoreWebView2InitializationCompleted += WebView21_CoreWebView2InitializationCompleted;
        }
        /* ---- Receive data ----- */

        public delegate void PacketReceveidEventHandler(object source, string message);

        public static event PacketReceveidEventHandler PacketReceveid;

        /* ---- Verify later how the packages gonna arrive to differ them ----- */
        static async void Listener()
        {
            UdpClient listener = new UdpClient(11000);
            IPEndPoint groupEP = new IPEndPoint(IPAddress.Any, 11000);

            try
            {
                while (true)
                {
                    UdpReceiveResult result = await listener.ReceiveAsync();
                    byte[] bytes = result.Buffer;
                    string message = Encoding.UTF8.GetString(bytes);

                    /* ---- Threads: Tasks ----- */
                    if (message == "Pacote 1")
                    {
                        Task.Run(() => HandleMap());
                    }
                    else if (message == "Pacote 2")
                    {
                        Task.Run(() => HandleAlerts());
                    }
                    else if (message == "Pacote 3")
                    {
                        Task.Run(() => HandleIEDGraph());
                    }
                }
            }
            catch (Exception e)
            {
                MessageBox.Show(e.ToString());
            }
            finally
            {
                listener.Close();
            }
        }

        private static Dictionary<string, double> HandleIEDGraph()
        {
            Dictionary<string, double> medidas = new Dictionary<string, double>();
            medidas.Add("Medida1", 10);
            medidas.Add("Medida2", 20);
            medidas.Add("Medida3", 15);
            medidas.Add("Medida4", 25);

            return medidas;
        }

        private static void HandleAlerts()
        {

        }

        private static List<Tuple<double, double>> HandleMap()
        {
            /* --- Handle with the content of the package, in this initial case this just serve a tuple with the coordinates --- */
            List<Tuple<double, double>> coord = new List<Tuple<double, double>>
            {
               Tuple.Create(-18.90638060788791, -48.23601196678411),// Parque do Sabiá
               Tuple.Create(-18.923591660657966, -48.28421094851784)
            };
            return coord;

        }


        /* ---- MAP ----- */
        /* ---- Verify later if it's gonna be this type of map with markers ----- */

        private void WebView21_CoreWebView2InitializationCompleted(object sender, CoreWebView2InitializationCompletedEventArgs e)
        {
            LoadMap(HandleMap());
        }

        private string BuildGoogleMapsUrl(List<Tuple<double, double>> coordinates, string apiKey)
        {
            StringBuilder urlBuilder = new StringBuilder("https://maps.googleapis.com/maps/api/staticmap?");

            // Add API key
            urlBuilder.Append("size=705x295&");
            urlBuilder.Append($"key={apiKey}&");


            urlBuilder.Append("markers=");

            // Add markers for each coordinate
            for (int i = 0; i < coordinates.Count; i++)
            {
                urlBuilder.Append($"{coordinates[i].Item1},{coordinates[i].Item2}|");

                if (i > coordinates.Count - 1)
                {
                    urlBuilder.Append("&");

                }
            }

            // Calculate bounds
            double minLat = coordinates.Min(c => c.Item1);
            double maxLat = coordinates.Max(c => c.Item1);
            double minLng = coordinates.Min(c => c.Item2);
            double maxLng = coordinates.Max(c => c.Item2);

            // zoom level
            int zoom = CalculateZoomLevel(minLat, maxLat, minLng, maxLng, 705, 295); // Adjust map size as needed

            // Set center and zoom level
            urlBuilder.Append($"&zoom={zoom}");

            //MessageBox.Show(urlBuilder.ToString());
            //textBox1.Text = urlBuilder.ToString();
            return urlBuilder.ToString();
        }

        private int CalculateZoomLevel(double minLat, double maxLat, double minLng, double maxLng, int width, int height)
        {
            const double maxZoom = 15;

            // Calculate map width and height in degrees
            double mapWidth = maxLng - minLng;
            double mapHeight = maxLat - minLat;

            // Convert map width and height to pixels per degree
            double pixelsPerDegreeX = width / mapWidth;
            double pixelsPerDegreeY = height / mapHeight;

            // Find the zoom level that fits both the width and height
            double zoomX = Math.Log(360.0 / 256.0 / pixelsPerDegreeX) / Math.Log(2);
            double zoomY = Math.Log(180.0 / 256.0 / pixelsPerDegreeY) / Math.Log(2);
            double zoom = Math.Min(zoomX, zoomY);

            return (int)Math.Min(zoom, maxZoom);
        }

        private void LoadMap(List<Tuple<double, double>> coordinates)
        {
            string apiKey = "AIzaSyCdBRxojFOJA16ilfd2Hsy8Skpi9KSuEc0";

            if (webView21.CoreWebView2 != null)
            {


                string url = BuildGoogleMapsUrl(coordinates, apiKey);
                //Console.WriteLine(url);
                webView21.CoreWebView2.Navigate(url);
            }
            else
            {
                MessageBox.Show("O controle WebView2 não pôde ser inicializado.");
            }
        }



        /* ---- Graphs ----- */

        private void LoadGraphs(Dictionary<string, double> medidas)
        {
            Chart chart = new Chart();
            chart.Size = new System.Drawing.Size(750, 350);
            chart.ChartAreas.Add(new ChartArea());
            //chart.Series.Add(new Series());
            Series series = chart.Series.Add("Minha Série");
            series.ChartType = SeriesChartType.Line;

            // Adicionando os pontos ao gráfico


            foreach (var medida in medidas)
            {
                MessageBox.Show(medida.Key);
                series.Points.AddXY(medida.Key, medida.Value);
            }

            // Definindo o tipo de gráfico
            //chart.Series[0].ChartType = SeriesChartType.Line;
            //chart.Series[0]["PixelPointWidth"] = "5";
            //chart.ChartAreas[0].AxisX.Interval = 1.0;

            // Adicionando o gráfico ao formulário
            groupBox2.Controls.Add(chart);
        }


        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }

        private void flowLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void groupBox1_Enter_1(object sender, EventArgs e)
        {

        }

        private void listView1_SelectedIndexChanged(object sender, EventArgs e)
        {



        }

        private void groupBox4_Enter(object sender, EventArgs e)
        {

        }

        private void webView21_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void groupBox2_Enter(object sender, EventArgs e)
        {
           
        }
    }
}
