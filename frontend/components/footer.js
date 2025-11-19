import Image from "next/image"
export default function Page() {
    return(
              <footer className="h-[100%] bg-[#1E3A8A] flex flex-col justify-around items-center gap-16  md:flex-row p-8">
                <div className="flex flex-col justify-center items-center">
                  <Image src={"/images/logo2.png"} width={150} height={150} alt="logo" />
                  <p className="text-[#111827]">
                    บริษัท Example Co., Ltd.<br/>
                    123/45 ถนนเชียงใหม่–ลำพูน<br/>
                    ต.หนองหอย อ.เมืองเชียงใหม่<br/>
                    จังหวัดเชียงใหม่ 50000<br/>
                    โทร: 081-234-5678<br/>
                    อีเมล: support@example.com<br/>
                  </p>
                </div>
                <div className="flex flex-col gap-9 text-center md:flex-row">
                  <div>
                    <h2>ติดต่อ</h2>
                    <span>
                      ..................................<br/>
                      ..................................<br/>
                      ..................................<br/>
                      ..................................<br/>
                    </span>
                  </div>
                            <div>
                    <h2>ข้อมูล</h2>
                    <span>
                      ..................................<br/>
                      ..................................<br/>
                      ..................................<br/>
                      ..................................<br/>
                    </span>
                  </div>
                            <div>
                    <h2>เกี่ยวกับเรา</h2>
                    <span>
                      ..................................<br/>
                      ..................................<br/>
                      ..................................<br/>
                      ..................................<br/>
                    </span>
                  </div>
                </div>
              </footer>
    )
}