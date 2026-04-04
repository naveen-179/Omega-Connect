from PIL import Image

def remove_background(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if pixel is dark (background)
            # Adjust threshold as needed based on the actual image darkness
            if item[0] < 50 and item[1] < 50 and item[2] < 50:
                newData.append((255, 255, 255, 0)) # Make it transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} and saved to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    remove_background("logo.png", "logo-transparent.png")
