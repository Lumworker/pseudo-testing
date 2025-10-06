import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { NextPage } from 'next';
import { buildPyramid } from '../utils/pyramidGenerator'; 

// กำหนด Type สำหรับ Form Data
type FormData = {
  rows: string;
};

const PyramidTestingPage: NextPage = () => {
  // เรียกใช้ useForm และกำหนด Default Values เป็น string
  const { control, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: { rows: '5' },
  });

  // ใช้ watch เพื่อติดตามค่า Input แบบ Real-time (ยังเป็น string)
  const watchedRowsString = watch('rows');
  
  // แปลงค่าจาก string เป็น number และตรวจสอบความถูกต้องเพื่อใช้ในการคำนวณ
  const parsedRows = parseInt(watchedRowsString);
  const currentRows = (parsedRows && Number.isInteger(parsedRows) && parsedRows >= 1) ? parsedRows : 0;

  // คำนวณ Output พีระมิด
  const pyramidOutput: string = useMemo(() => {
    return buildPyramid(currentRows);
  }, [currentRows]);

  // Logic สำหรับตรวจสอบ Error Message 
  const displayError = errors.rows?.message;

  return (
    // Responsive Layout
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 sm:p-10 font-sans">
      
      <main className="w-full max-w-5xl bg-white p-6 sm:p-10 rounded-2xl shadow-2xl transition duration-300">
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
            Pyramid Generator
        </h1>
        <p className="text-blue-500 mb-10 text-lg">Project: **pseudo-testing** (RHF + TS + Tailwind)</p>
        
        {/* ส่วน Input Control */}
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-md">
          <label htmlFor="rowsInput" className="block text-xl font-semibold text-blue-800 mb-3">
            กำหนดจำนวนบรรทัด (Rows)
          </label>
          <div className="flex justify-center">
            
            <Controller
              name="rows"
              control={control}
              rules={{
                required: 'ต้องกรอกจำนวนบรรทัด',
                
                // 💡 การใช้ Regex เพื่ออนุญาตเฉพาะตัวเลขเท่านั้น
                // /^\d+$/ หมายถึง: ต้องเริ่มด้วยตัวเลข (\d) และตามด้วยตัวเลขหนึ่งตัวหรือมากกว่า (+) จนจบ ($)
                pattern: { 
                    value: /^\d+$/, 
                    message: 'อนุญาตเฉพาะตัวเลข 0-9 เท่านั้น' 
                },
                
                // 💡 ใช้ Validate เพื่อตรวจสอบช่วงค่า, จำนวนเต็ม, และต้องไม่เป็น 0
                validate: value => {
                    const numValue = parseInt(value);
                    if (numValue === 0) return 'จำนวนบรรทัดต้องมากกว่า 0';
                    if (numValue < 1) return 'จำนวนบรรทัดต้องมีค่าอย่างน้อย 1';
                    if (numValue > 25) return 'จำนวนบรรทัดไม่ควรเกิน 25';
                    if (!Number.isInteger(numValue)) return 'ต้องเป็นจำนวนเต็มเท่านั้น';
                    return true;
                }
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="rowsInput"
                  type="text" 
                  placeholder="เช่น: 5"
                  className={`
                    p-3 w-40 text-2xl text-center font-mono border-2 rounded-lg 
                    shadow-xl focus:outline-none focus:ring-4 transition duration-200 
                    
                    bg-gray-800 text-white placeholder-gray-400 
                    
                    ${displayError 
                        ? 'border-red-500 ring-red-200 bg-red-800 text-white' 
                        : 'border-gray-600 focus:border-blue-400 focus:ring-blue-300'
                    }
                  `}
                />
              )}
            />
          </div>
          
          {/* แสดง Error Message ที่มาจาก React Hook Form */}
          {displayError && <p className="text-red-600 mt-3 text-sm font-semibold">{displayError}</p>}
        </div>

        <hr className="my-8 border-t-2 border-blue-100" />

        {/* ส่วน Output Display */}
        <h2 className="text-3xl font-bold mb-4 text-gray-700">Output ({currentRows} Rows)</h2>
        
        <div className="flex justify-center overflow-x-auto p-2">
          {/* ใช้ <pre> เพื่อรักษาช่องว่างและฟอนต์ Monospace */}
          <pre className="
            text-xs sm:text-sm lg:text-lg 
            font-mono 
            bg-gray-800 
            text-yellow-300 
            p-6 sm:p-8 
            border border-gray-700 
            rounded-xl 
            shadow-2xl 
            text-left 
            leading-tight
            whitespace-pre
            w-full max-w-full 
          ">
            {pyramidOutput}
          </pre>
        </div>

      </main>
      
      <footer className="mt-8 text-gray-500 text-sm">
      </footer>
      
    </div>
  );
}

export default PyramidTestingPage;