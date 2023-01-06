use rust_wordcount::count;
use std::env;
use std::fs::File;
use std::io::BufReader;

fn main() {
    // コマンドラインで指定された引数を読み込む
    let filename = env::args().nth(1).expect("1 argument FILENAME required");
    // 指定されたファイルを開く
    let file = File::open(filename).unwrap();
    let reader = BufReader::new(&file);

    // ファイルから一行ずつ読み込む
    let freqs = count(reader, Default::default());
    println!("{:?}", freqs);
}
