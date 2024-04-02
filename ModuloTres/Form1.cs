using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;
using Microsoft.Web.WebView2.Wpf;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Windows.Forms;

namespace ModuloTres
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            webView21.EnsureCoreWebView2Async(null);
            webView21.CoreWebView2InitializationCompleted += WebView21_CoreWebView2InitializationCompleted;
        }

        /* ---- MAP ----- */
        private void WebView21_CoreWebView2InitializationCompleted(object sender, CoreWebView2InitializationCompletedEventArgs e)
        {
            LoadMap();
        }

        private string BuildGoogleMapsUrl(List<Tuple<double, double>> coordinates, string apiKey)
        {
            StringBuilder urlBuilder = new StringBuilder("https://maps.googleapis.com/maps/api/staticmap?");

            // Add API key
            urlBuilder.Append($"key={apiKey}&");

            urlBuilder.Append("size=705x295&");

            // Add markers for each coordinate
            for (int i = 0; i < coordinates.Count; i++)
            {
                urlBuilder.Append($"markers={coordinates[i].Item1},{coordinates[i].Item2}");

                if (i < coordinates.Count - 1)
                {
                    urlBuilder.Append("&");
                }
            }

            // Calculate bounds
            double minLat = coordinates.Min(c => c.Item1);
            double maxLat = coordinates.Max(c => c.Item1);
            double minLng = coordinates.Min(c => c.Item2);
            double maxLng = coordinates.Max(c => c.Item2);

            // Calculate center and zoom level
            double centerLat = (minLat + maxLat) / 2;
            double centerLng = (minLng + maxLng) / 2;
            int zoom = CalculateZoomLevel(minLat, maxLat, minLng, maxLng, 705, 295); // Adjust map size as needed

            // Set center and zoom level
            urlBuilder.Append($"&center={centerLat},{centerLng}&zoom={zoom}");

            return urlBuilder.ToString();
        }

        private int CalculateZoomLevel(double minLat, double maxLat, double minLng, double maxLng, int width, int height)
        {
            const double maxZoom = 21;

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

        private void LoadMap()
        {
            string apiKey = "API_KEY";

            if (webView21.CoreWebView2 != null)
            {
                List<Tuple<double, double>> coordenadas = new List<Tuple<double, double>>
{
                Tuple.Create(-18.918792, -48.277149), // Exemplo: Prefeitura Municipal de Uberlândia
                Tuple.Create(-18.924892, -48.267951), // Exemplo: Parque do Sabiá
                Tuple.Create(-18.920793, -48.277213)  // Exemplo: Centro de Convenções
                // Adicione mais coordenadas conforme necessário
};

                string url = BuildGoogleMapsUrl(coordenadas, apiKey);
                Console.WriteLine(url);
                webView21.CoreWebView2.Navigate(url);
            }
            else
            {
                MessageBox.Show("O controle WebView2 não pôde ser inicializado.");
            }
        }



        /* ---- Graphs ----- */



        /* ---- Receive data ----- */
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
    }
}
