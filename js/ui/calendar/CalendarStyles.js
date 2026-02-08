export function createCalendarStyles() {
  return `
        <style>
            .step-calendar-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 8px;
                margin-top: 10px;
            }
            .step-calendar-day {
                aspect-ratio: 1;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                padding: 8px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                position: relative;
            }
            .step-calendar-day:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .step-calendar-day-header {
                font-weight: 600;
                text-align: center;
                padding: 8px;
                color: #666;
            }
            .step-day-number {
                font-size: 18px;
                font-weight: bold;
            }
            .step-day-label {
                font-size: 11px;
                margin-top: 4px;
                text-align: center;
            }
            .step-day-goal {
                font-size: 10px;
                margin-top: 2px;
                text-align: center;
                font-weight: 600;
            }
        </style>
    `;
}
