# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

require 'faker'

#put destroy all stuff for for each thing to make seeding more consistent
#example: User.destroy_all

rrml = School.create({name: "Rockin' Robin Music Lessons", location: "9029 Hwy. 6 Suite 160 Missouri City, TX 77459, USA" })
river_oaks = School.create({name: "River Oaks Music School", location: "1701 S Shepherd Dr suite e, Houston, TX 77019" })

roy = User.create({ first_name: "Roysan", last_name: "Easo", username: "roysan", password: "123", email: "roy.example@gmail.com", permissions:"all"})
UserSchool.create({school: rrml, user: roy})
UserSchool.create({school: river_oaks, user: roy})

skiles = User.create({ first_name: "Skiles", last_name: "Kelley", username: "skilesk", password: "123", email: "skilesk.example@gmail.com", permissions:"all"})
UserSchool.create({school: rrml, user: skiles})
UserSchool.create({school: river_oaks, user: skiles})

10.times do |num|
    Faker::Config.locale = 'en-US'
    phone_number = "#{Faker::PhoneNumber.area_code}#{Faker::PhoneNumber.exchange_code}#{Faker::PhoneNumber.subscriber_number}".to_i
    instruments = ["Piano", "Guitar", "Drums", "Voice", "Saxophone", "Violin", "Flute"]

    first_name = Faker::Name.first_name
    instructor = Instructor.create({first_name: first_name, last_name: Faker::Name.last_name, date_of_birth: Faker::Date.birthday(min_age: 22, max_age: 60), phone_number: phone_number, email: "#{first_name}@gmail.com", instrument_1: instruments.sample, instrument_2: instruments.sample, pay_rate: 30, biography: Faker::Quote.matz, active: true})
    InstructorSchool.create({ school: rrml, instructor: instructor })
end

Instructor.all.each do |instructor|
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    start_times = ["3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"]
    end_times = ["3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"]
    temp_days = [days.sample,days.sample,days.sample,days.sample]
    temp_days.uniq.each do |day|
        start_times.count.times do |index|
            ClassTime.create(start_time: start_times[index], end_time: end_times[index], day: day, instructor: instructor, school: rrml, active: true)
        end
    end
end

20.times do |num|
    Faker::Config.locale = 'en-US'
    phone_number = "#{Faker::PhoneNumber.area_code}#{Faker::PhoneNumber.exchange_code}#{Faker::PhoneNumber.subscriber_number}".to_i

    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    family = Family.create({family_name: last_name})

    student = Student.create({first_name: first_name, last_name: last_name, date_of_birth: Faker::Date.birthday(min_age: 10, max_age: 60), phone_number: phone_number, email: "#{first_name}@gmail.com", school: rrml, family: family})
    age = Date.today.year - student.date_of_birth.to_s.split(" ")[-1].to_i

    if age > 20
        Contact.create({first_name: first_name, last_name: last_name, relation_to_students: 'Student', phone_number: phone_number, email: "#{first_name}@gmail.com", school: rrml, family: family})
    else
        parent_first_name = Faker::Name.first_name
        Contact.create({first_name: parent_first_name, last_name: last_name, relation_to_students: 'Parent', phone_number: phone_number, email: "#{parent_first_name}@gmail.com", school: rrml, family: family})
    end

    instructor = Instructor.all.sample
    Lesson.create({active:true, student: student, class_time: instructor.class_times.sample, instrument: instructor.instrument_1, school: rrml, price: 100})
end