namespace ModuloTres
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            Mapa = new GroupBox();
            groupBox2 = new GroupBox();
            groupBox3 = new GroupBox();
            groupBox4 = new GroupBox();
            SuspendLayout();
            // 
            // Mapa
            // 
            Mapa.BackColor = SystemColors.ControlLight;
            Mapa.FlatStyle = FlatStyle.System;
            Mapa.Location = new Point(708, 52);
            Mapa.Name = "Mapa";
            Mapa.Size = new Size(994, 475);
            Mapa.TabIndex = 0;
            Mapa.TabStop = false;
            Mapa.Text = "Mapa";
            Mapa.Enter += groupBox1_Enter_1;
            // 
            // groupBox2
            // 
            groupBox2.BackColor = SystemColors.ControlLight;
            groupBox2.Location = new Point(12, 52);
            groupBox2.Name = "groupBox2";
            groupBox2.Size = new Size(674, 441);
            groupBox2.TabIndex = 1;
            groupBox2.TabStop = false;
            groupBox2.Text = "Dispositivos IED";
            // 
            // groupBox3
            // 
            groupBox3.BackColor = SystemColors.ControlLight;
            groupBox3.Location = new Point(12, 499);
            groupBox3.Name = "groupBox3";
            groupBox3.Size = new Size(674, 235);
            groupBox3.TabIndex = 2;
            groupBox3.TabStop = false;
            groupBox3.Text = "Alertas";
            // 
            // groupBox4
            // 
            groupBox4.BackColor = SystemColors.ControlLight;
            groupBox4.Location = new Point(706, 534);
            groupBox4.Name = "groupBox4";
            groupBox4.Size = new Size(996, 200);
            groupBox4.TabIndex = 3;
            groupBox4.TabStop = false;
            groupBox4.Text = "Eventos";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(10F, 25F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1714, 746);
            Controls.Add(groupBox4);
            Controls.Add(groupBox3);
            Controls.Add(groupBox2);
            Controls.Add(Mapa);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
        }

        #endregion

        private GroupBox Mapa;
        private GroupBox groupBox2;
        private GroupBox groupBox3;
        private GroupBox groupBox4;
    }
}
