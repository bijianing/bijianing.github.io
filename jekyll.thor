require "stringex"
class Jekyll < Thor
  desc "new", "create a new post"
  method_option :cate, :default => ""
  def new(*title)
    title = title.join(" ")
    date = Time.now.strftime('%Y-%m-%d')
	c = options[:cate]

	if c == "" then
		dirname = "_posts"
	else
		dirname = "#{c}/_posts"
	end

	if ! Dir.exists?(dirname) then
		Dir.mkdir(dirname, 0771)
	end

	filename = "#{dirname}/#{date}-#{title.to_url}.md"

    if File.exist?(filename)
      abort("#{filename} already exists!")
    end

    puts "Creating new post: #{filename}"
    open(filename, 'w') do |post|
      post.puts "---"
      post.puts "layout: post"
#      post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
#      post.puts "date: #{Time.now}"
#      post.puts "category: #{c}"
      post.puts "tags:"
      post.puts "---"
      post.puts "* content"
      post.puts "{:toc}"
    end

	#system("emacs #{filename}")

  end
end
