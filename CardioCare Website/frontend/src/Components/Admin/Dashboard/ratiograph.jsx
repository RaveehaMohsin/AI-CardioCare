import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import debounce from 'lodash.debounce';

export default function HeartDiseasePredictionChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [predictionData, setPredictionData] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to fetch health details and process predictions data
  const fetchPredictionData = async () => {
    try {
      const response = await fetch('http://localhost:4000/gethealthdetails');
      const data = await response.json();

      // Process and aggregate prediction results (Yes, No, Maybe)
      const predictionCounts = {
        Yes: 0,
        No: 0,
        Maybe: 0,
      };

      // Count occurrences of each prediction result
      data.forEach((item) => {
        if (item.predictionResult === 'Yes') {
          predictionCounts.Yes += 1;
        } else if (item.predictionResult === 'No') {
          predictionCounts.No += 1;
        } else if (item.predictionResult === 'Maybe') {
          predictionCounts.Maybe += 1;
        }
      });

      setPredictionData(predictionCounts); // Set aggregated data to state
    } catch (error) {
      console.error('Error fetching prediction data:', error);
    }
  };

  // Fetch data on component mount and whenever screen width changes
  useEffect(() => {
    fetchPredictionData();
  }, [screenWidth]);

  // Re-render the chart when prediction data changes
  useEffect(() => {
    if (chartRef.current && Object.keys(predictionData).length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy previous chart instance
      }

      // Prepare the dataset for the chart
      const labels = ['Yes', 'No', 'Maybe'];
      const data = [
        predictionData.Yes,
        predictionData.No,
        predictionData.Maybe,
      ];

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line', // Change chart type to 'line' for spline chart
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Prediction Result Counts',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust the background color for the line chart
              borderColor: 'rgb(75, 192, 192)', // Line color
              borderWidth: 2, // Set line width
              tension: 0.4, // Set the tension to create a smooth curve (spline effect)
              fill: true, // Fill area under the line
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const label = tooltipItem.dataset.label || '';
                  const value = tooltipItem.raw || '';
                  return `${label}: ${value} predictions`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: true,
              },
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [predictionData]);

  // Debounced resize handler to refetch data on screen width change
  const handleResize = debounce(() => {
    setScreenWidth(window.innerWidth);
  }, 500); // Adjust debounce delay as needed

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={chartRef}
        style={{ width: '100%', height: '100%' }} // Make canvas responsive
      ></canvas>
    </div>
  );
}
